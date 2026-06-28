import { useEffect, useState } from 'react'
import { getTontines, getTontineById } from '@/lib/supabase'

export function useTontines() {
  const [tontines, setTontines] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    fetchTontines()
  }, [])

  const fetchTontines = async () => {
    setLoading(true)
    const { data, error } = await getTontines()
    if (error) setError(error)
    else setTontines(data || [])
    setLoading(false)
  }

  return { tontines, loading, error, refetch: fetchTontines }
}

export function useTontineById(id: string) {
  const [tontine, setTontine] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchTontine()
    }
  }, [id])

  const fetchTontine = async () => {
    setLoading(true)
    const { data, error } = await getTontineById(id)
    if (error) setError(error)
    else setTontine(data)
    setLoading(false)
  }

  return { tontine, loading, error, refetch: fetchTontine }
}
