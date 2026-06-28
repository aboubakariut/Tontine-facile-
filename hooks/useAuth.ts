import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { supabase, getCurrentUser } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const routerRef = useRef(router)

  useEffect(() => {
    routerRef.current = router
  })

  useEffect(() => {
    const checkUser = async () => {
      const { user } = await getCurrentUser()
      setUser(user)
      setLoading(false)
    }

    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
      if (event === 'SIGNED_OUT') {
        routerRef.current.push('/')
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  return { user, loading }
}
