-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    avatar_url TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TONTINES TABLE
CREATE TABLE IF NOT EXISTS tontines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    amount INT NOT NULL,
    frequency TEXT NOT NULL,
    total_members INT NOT NULL,
    creator_id UUID REFERENCES users(id),
    status TEXT DEFAULT 'active',
    order_type TEXT DEFAULT 'fixed',
    payment_method TEXT DEFAULT 'momo',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TONTINE MEMBERS TABLE
CREATE TABLE IF NOT EXISTS tontine_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tontine_id UUID REFERENCES tontines(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_number INT,
    status TEXT DEFAULT 'pending',
    has_received BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tontine_id, user_id)
);

-- COTISATIONS TABLE
CREATE TABLE IF NOT EXISTS cotisations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tontine_id UUID REFERENCES tontines(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount INT NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_method TEXT,
    transaction_id TEXT UNIQUE,
    due_date TIMESTAMP,
    paid_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tontine_id UUID REFERENCES tontines(id) ON DELETE CASCADE,
    from_user_id UUID REFERENCES users(id),
    to_user_id UUID REFERENCES users(id),
    amount INT NOT NULL,
    description TEXT,
    transaction_type TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- INVITATIONS TABLE
CREATE TABLE IF NOT EXISTS invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tontine_id UUID REFERENCES tontines(id) ON DELETE CASCADE,
    invited_phone TEXT NOT NULL,
    invited_by UUID REFERENCES users(id),
    status TEXT DEFAULT 'pending',
    invitation_code TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tontine_id UUID REFERENCES tontines(id),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tontines ENABLE ROW LEVEL SECURITY;
ALTER TABLE tontine_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE cotisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies: tontines
CREATE POLICY "Users can view their tontines" ON tontines FOR SELECT USING (
  EXISTS (SELECT 1 FROM tontine_members WHERE tontine_members.tontine_id = tontines.id AND tontine_members.user_id = auth.uid())
  OR creator_id = auth.uid()
);
CREATE POLICY "Users can create tontines" ON tontines FOR INSERT WITH CHECK (creator_id = auth.uid());
CREATE POLICY "Creators can update their tontines" ON tontines FOR UPDATE USING (creator_id = auth.uid());

-- RLS Policies: tontine_members
CREATE POLICY "Members can view memberships of their tontines" ON tontine_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM tontines WHERE tontines.id = tontine_members.tontine_id AND (tontines.creator_id = auth.uid() OR tontine_members.user_id = auth.uid()))
);
CREATE POLICY "Creators can add members" ON tontine_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM tontines WHERE tontines.id = tontine_id AND tontines.creator_id = auth.uid())
);

-- RLS Policies: cotisations
CREATE POLICY "Members can view cotisations of their tontines" ON cotisations FOR SELECT USING (
  EXISTS (SELECT 1 FROM tontine_members WHERE tontine_members.tontine_id = cotisations.tontine_id AND tontine_members.user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM tontines WHERE tontines.id = cotisations.tontine_id AND tontines.creator_id = auth.uid())
);
CREATE POLICY "Members can create cotisations" ON cotisations FOR INSERT WITH CHECK (
  user_id = auth.uid()
  AND EXISTS (SELECT 1 FROM tontine_members WHERE tontine_members.tontine_id = cotisations.tontine_id AND tontine_members.user_id = auth.uid())
);

-- RLS Policies: transactions
CREATE POLICY "Members can view transactions of their tontines" ON transactions FOR SELECT USING (
  from_user_id = auth.uid()
  OR to_user_id = auth.uid()
  OR EXISTS (SELECT 1 FROM tontines WHERE tontines.id = transactions.tontine_id AND tontines.creator_id = auth.uid())
);
CREATE POLICY "Authenticated users can create transactions" ON transactions FOR INSERT WITH CHECK (from_user_id = auth.uid());

-- RLS Policies: invitations
CREATE POLICY "Creators can manage invitations" ON invitations FOR SELECT USING (
  invited_by = auth.uid()
  OR EXISTS (SELECT 1 FROM tontines WHERE tontines.id = invitations.tontine_id AND tontines.creator_id = auth.uid())
);
CREATE POLICY "Creators can create invitations" ON invitations FOR INSERT WITH CHECK (
  invited_by = auth.uid()
  AND EXISTS (SELECT 1 FROM tontines WHERE tontines.id = tontine_id AND tontines.creator_id = auth.uid())
);
CREATE POLICY "Creators can update invitations" ON invitations FOR UPDATE USING (invited_by = auth.uid());

-- RLS Policies: notifications
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);
