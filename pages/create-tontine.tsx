import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import { createTontine } from '@/lib/supabase'
import Navigation from '@/components/Navigation'

export default function CreateTontine() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: 10000,
    frequency: 'weekly',
    total_members: 10,
    start_date: '',
    payment_method: 'both',
    order_type: 'fixed',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'total_members' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (formData.amount < 1000) throw new Error('Le montant minimum est de 1000 FCFA')
      if (formData.total_members < 2 || formData.total_members > 100)
        throw new Error('Le nombre de membres doit être entre 2 et 100')
      const { error: createError } = await createTontine(formData)
      if (createError) throw createError
      router.push('/dashboard?created=1')
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) return <div className="container" style={{ textAlign: 'center', paddingTop: '40px' }}>Chargement...</div>
  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <>
      <Head>
        <title>Créer une tontine - Tontine Facile</title>
        <meta name="theme-color" content="#1d4ed8" />
      </Head>

      <Navigation user={user} />

      <div className="container">
        <div className="card">
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Nom de la tontine <span style={{ color: '#991b1b' }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Exemple : Adachi Famille 2026"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="amount">
              Montant par cotisation (FCFA) <span style={{ color: '#991b1b' }}>*</span>
            </label>
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder="minimum 1000"
              min="1000"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <label htmlFor="frequency">
              Fréquence des cotisations <span style={{ color: '#991b1b' }}>*</span>
            </label>
            <select id="frequency" name="frequency" value={formData.frequency} onChange={handleChange} required>
              <option value="">Choisir...</option>
              <option value="daily">Quotidienne</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="biweekly">Toutes les 2 semaines</option>
              <option value="monthly">Mensuelle</option>
            </select>

            <label htmlFor="total_members">
              Nombre total de membres <span style={{ color: '#991b1b' }}>*</span>
            </label>
            <input
              id="total_members"
              type="number"
              name="total_members"
              placeholder="minimum 2"
              min="2"
              max="50"
              value={formData.total_members}
              onChange={handleChange}
              required
            />

            <label htmlFor="start_date">
              Date de début <span style={{ color: '#991b1b' }}>*</span>
            </label>
            <input
              id="start_date"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />

            <label htmlFor="payment_method">Méthode de paiement principale</label>
            <select id="payment_method" name="payment_method" value={formData.payment_method} onChange={handleChange}>
              <option value="momo">MTN MoMo</option>
              <option value="orange">Orange Money</option>
              <option value="both">Les deux (MoMo + Orange)</option>
              <option value="cash">Espèces (manuel)</option>
            </select>

            <label htmlFor="order_type">Ordre des bénéficiaires</label>
            <select id="order_type" name="order_type" value={formData.order_type} onChange={handleChange}>
              <option value="fixed">Ordre fixe (défini maintenant ou plus tard)</option>
              <option value="random">Tirage au sort automatique</option>
              <option value="auction">Enchères (le plus offrant reçoit)</option>
            </select>

            <label htmlFor="description">Description / Règles (optionnel)</label>
            <textarea
              id="description"
              name="description"
              placeholder="Règles spéciales, pénalités pour retard, etc."
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button type="submit" className="btn" disabled={loading} style={{ flex: 1 }}>
                {loading ? 'Création...' : 'Créer la tontine'}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => router.push('/dashboard')}
                style={{ flex: 1 }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
