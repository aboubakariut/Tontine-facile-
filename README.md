# Tontine Facile - Application de Gestion de Tontines

## 📋 Description

Tontine Facile est une application web moderne pour gérer les tontines (Adachi, njangi) en toute transparence. Construite avec Next.js et Supabase, elle offre une gestion complète des contributions, des membres et des bénéficiaires.

## 🚀 Stack Technologique

- **Frontend**: Next.js 14 + React 18
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT)
- **Hosting**: Vercel
- **Styling**: CSS vanilla

## 📦 Installation

### 1. Cloner le repository
```bash
git clone https://github.com/aboubakariut/Tontine-facile-.git
cd Tontine-facile-
git checkout supabase-nextjs
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer Supabase

1. Aller sur https://supabase.com et créer un compte
2. Créer un nouveau projet "tontine-facile"
3. Dans l'SQL Editor, exécuter le contenu du fichier `supabase.sql`
4. Copier les credentials du projet

### 4. Variables d'environnement

Copier `.env.local.example` en `.env.local` et remplir :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Lancer le projet

```bash
npm run dev
```

Ouvrir http://localhost:3000

## 🏗️ Structure du projet

```
.
├── pages/                # Pages Next.js
│   ├── index.tsx        # Login/Register
│   ├── dashboard.tsx    # Tableau de bord
│   ├── create-tontine.tsx
│   ├── profile.tsx
│   └── tontine/[id].tsx # Détails tontine
├── components/          # Composants React
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires
│   └── supabase.ts    # Client Supabase
├── styles/             # CSS global
├── supabase.sql       # Schéma SQL
└── public/            # Fichiers statiques
```

## 🔧 Fonctionnalités

### ✅ Implémentées
- [x] Authentification (inscription/login)
- [x] Créer une tontine
- [x] Voir ses tontines
- [x] Cotiser à une tontine
- [x] Voir l'historique des cotisations
- [x] Profil utilisateur
- [x] Realtime updates

### 🔲 À faire
- [ ] Système d'invitations
- [ ] Intégration paiement (MTN MoMo, Orange Money)
- [ ] Notifications push
- [ ] Export PDF
- [ ] Admin panel
- [ ] Analytics

## 🚀 Déploiement sur Vercel

### 1. Connecter le repo
```bash
git push origin supabase-nextjs
```

### 2. Sur Vercel
1. Aller sur https://vercel.com
2. Importer le repo GitHub
3. Sélectionner la branche `supabase-nextjs`
4. Ajouter les variables d'env (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
5. Déployer !

URL: https://tontine-facile.vercel.app

## 📚 API Supabase disponible

### Authentication
```typescript
const { data, error } = await signUp(email, password, name, phone)
const { data, error } = await signIn(email, password)
await signOut()
```

### Tontines
```typescript
const { data, error } = await getTontines()
const { data, error } = await getTontineById(id)
const { error } = await createTontine(tontineData)
```

### Cotisations
```typescript
const { error } = await createCotisation(tontineId, amount, paymentMethod)
const { data, error } = await getCotisations(tontineId)
```

## 🔐 Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- JWT authentication via Supabase
- Variables d'env protégées sur Vercel
- Pas de données sensibles en frontend

## 🐛 Debug

Pour voir les logs Supabase:
```typescript
const { data, error } = await getTontines()
if (error) console.error('Supabase Error:', error)
```

## 📞 Support

Contacter: aboubakariut@example.com

## 📄 License

MIT
