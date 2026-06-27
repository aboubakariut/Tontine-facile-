import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ═══════════════════════════════════════════════════════
// AUTHENTICATION
// ═══════════════════════════════════════════════════════

export async function signUp(
  email: string,
  password: string,
  name: string,
  phone: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (!error && data.user) {
    await supabase.from('users').insert([
      {
        id: data.user.id,
        name,
        phone,
        email,
      },
    ])
  }
  return { data, error }
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  return { user: data?.user, error }
}

// ═══════════════════════════════════════════════════════
// TONTINES
// ═══════════════════════════════════════════════════════

export async function getTontines() {
  const { data, error } = await supabase
    .from('tontines')
    .select(
      '*, creator:users(name, phone), members:tontine_members(*, user:users(name, phone))'
    )
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getTontineById(id: string) {
  const { data, error } = await supabase
    .from('tontines')
    .select(
      '*, creator:users(name, phone), members:tontine_members(*, user:users(name, phone)), cotisations:cotisations(*, user:users(name, phone))'
    )
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createTontine(tontine: any) {
  const { data: user } = await supabase.auth.getUser()

  return await supabase.from('tontines').insert([
    {
      ...tontine,
      creator_id: user?.user?.id,
    },
  ])
}

export async function updateTontine(id: string, updates: any) {
  return await supabase.from('tontines').update(updates).eq('id', id)
}

// ═══════════════════════════════════════════════════════
// TONTINE MEMBERS
// ═══════════════════════════════════════════════════════

export async function addMemberToTontine(
  tontineId: string,
  userId: string,
  orderNumber?: number
) {
  return await supabase.from('tontine_members').insert([
    {
      tontine_id: tontineId,
      user_id: userId,
      order_number: orderNumber,
      status: 'active',
    },
  ])
}

export async function getTontineMembers(tontineId: string) {
  const { data, error } = await supabase
    .from('tontine_members')
    .select('*, user:users(id, name, phone, email)')
    .eq('tontine_id', tontineId)
    .order('order_number', { ascending: true })
  return { data, error }
}

// ═══════════════════════════════════════════════════════
// COTISATIONS
// ═══════════════════════════════════════════════════════

export async function createCotisation(
  tontineId: string,
  amount: number,
  paymentMethod: string = 'cash'
) {
  const { data: user } = await supabase.auth.getUser()

  return await supabase.from('cotisations').insert([
    {
      tontine_id: tontineId,
      user_id: user?.user?.id,
      amount,
      status: 'completed',
      payment_method: paymentMethod,
      paid_date: new Date().toISOString(),
    },
  ])
}

export async function getCotisations(tontineId: string) {
  const { data, error } = await supabase
    .from('cotisations')
    .select('*, user:users(name, phone)')
    .eq('tontine_id', tontineId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ═══════════════════════════════════════════════════════
// TRANSACTIONS HISTORY
// ═══════════════════════════════════════════════════════

export async function getTransactions(tontineId: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, from_user:users(name, phone), to_user:users(name, phone)')
    .eq('tontine_id', tontineId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ═══════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════

export async function getNotifications() {
  const { data: user } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user?.user?.id)
    .eq('read', false)
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function markNotificationAsRead(id: string) {
  return await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id)
}

// ═══════════════════════════════════════════════════════
// REALTIME SUBSCRIPTIONS
// ═══════════════════════════════════════════════════════

export function subscribeToCotisations(
  tontineId: string,
  callback: (payload: any) => void
) {
  return supabase
    .from(`cotisations:tontine_id=eq.${tontineId}`)
    .on('*', (payload) => callback(payload))
    .subscribe()
}

export function subscribeToTontineMembers(
  tontineId: string,
  callback: (payload: any) => void
) {
  return supabase
    .from(`tontine_members:tontine_id=eq.${tontineId}`)
    .on('*', (payload) => callback(payload))
    .subscribe()
}
