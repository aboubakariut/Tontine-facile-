import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signUp(email: string, password: string, name: string, phone: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (!error && data.user) {
    await supabase.from('users').insert([{
      id: data.user.id,
      name,
      phone,
      email,
    }])
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

export async function getTontines() {
  const { data, error } = await supabase
    .from('tontines')
    .select('*, creator:users(name, phone), members:tontine_members(*, user:users(name, phone))')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getTontineById(id: string) {
  const { data, error } = await supabase
    .from('tontines')
    .select('*, creator:users(name, phone), members:tontine_members(*, user:users(name, phone)), cotisations:cotisations(*, user:users(name, phone))')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createTontine(tontine: any) {
  const { data: user } = await supabase.auth.getUser()
  return await supabase.from('tontines').insert([{
    ...tontine,
    creator_id: user?.user?.id,
  }])
}

export async function createCotisation(tontineId: string, amount: number, paymentMethod: string = 'cash') {
  const { data: user } = await supabase.auth.getUser()
  return await supabase.from('cotisations').insert([{
    tontine_id: tontineId,
    user_id: user?.user?.id,
    amount,
    status: 'completed',
    payment_method: paymentMethod,
    paid_date: new Date().toISOString(),
  }])
}

export async function getCotisations(tontineId: string) {
  const { data, error } = await supabase
    .from('cotisations')
    .select('*, user:users(name, phone)')
    .eq('tontine_id', tontineId)
    .order('created_at', { ascending: false })
  return { data, error }
}
