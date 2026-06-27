import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
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
    payment_method: 'momo',
    order_type: 'fixed',
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' || name === 'total_members' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (formData.amount < 1000) throw new Error('Le montant minimum est de 1000 FCFA')
      if (formData.total_members < 2 || formData.total_members > 100) throw new Error('Le nombre de membres doit être entre 2 et 100')
      const { error: createError } = await createTontine(formData)
      if (createError) throw createError
      alert('Tontine créée avec succès !')
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) return <div className="container" style={{ textAlign: 'center' }}>Chargement...</div>

  return (
    <>
      <Head><title>Créer une tontine - Tontine Facile</title></Head>
      <Navigation user={user} />
      <header><h1>Créer une nouvelle tontine</h1><p>Configurez votre Adachi / njangi en quelques clics</p></header>
      <div className="container">
        <div className="card">
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>Nom de la tontine *</label>
            <input type="text" name="name" placeholder="Exemple: Adachi Famille 2026" value={formData.name} onChange={handleChange} required />
            <label>Description (optionnel)</label>
            <textarea name="description" placeholder="Règles spéciales, pénalités, etc." value={formData.description} onChange={handleChange} rows={3} />
            <label>Montant par cotisation (FCFA) *</label>
            <input type="number" name="amount" min="1000" value={formData.amount} onChange={handleChange} required />
            <label>Fréquence des cotisations *</label>
            <select name="frequency" value={formData.frequency} onChange={handleChange} required>
              <option value="daily">Quotidienne</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuelle</option>
            </select>
            <label>Nombre total de membres *</label>
            <input type="number" name="total_members" min="2" max="100" value={formData.total_members} onChange={handleChange} required />
            <label>Méthode de paiement</label>
            <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
              <option value="momo">MTN MoMo</option>
              <option value="orange">Orange Money</option>
              <option value="both">Les deux</option>
              <option value="cash">Espèces</option>
            </select>
            <label>Ordre des bénéficiaires</label>
            <select name="order_type" value={formData.order_type} onChange={handleChange}>
              <option value="fixed">Ordre fixe</option>
              <option value="random">Tirage au sort</option>
              <option value="auction">Enchères</option>
            </select>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn" disabled={loading}>{loading ? 'Création...' : 'Créer la tontine'}</button>
              <Link href="/dashboard"><button type="button" className="btn btn-outline">Annuler</button></Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
