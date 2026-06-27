import { useEffect, useState } from 'react'
import { getCotisations, createCotisation } from '@/lib/supabase'

export function useCotisations(tontineId: string) {
  const [cotisations, setCotisations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (tontineId) fetchCotisations()
  }, [tontineId])

  const fetchCotisations = async () => {
    setLoading(true)
    const { data, error } = await getCotisations(tontineId)
    if (error) {
      setError(error)
    } else {
      setCotisations(data || [])
    }
    setLoading(false)
  }

  const addCotisation = async (amount: number, paymentMethod: string) => {
    const { error } = await createCotisation(
      tontineId,
      amount,
      paymentMethod
    )
    if (!error) {
      fetchCotisations()
    }
    return error
  }

  return { cotisations, loading, error, addCotisation, refetch: fetchCotisations }
}
