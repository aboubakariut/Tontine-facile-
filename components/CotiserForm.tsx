import { useState } from 'react'
import { createCotisation } from '@/lib/supabase'

interface CotiserFormProps {
  tontineId: string
  amount: number
  onSuccess: () => void
  onCancel: () => void
}

export default function CotiserForm({
  tontineId,
  amount,
  onSuccess,
  onCancel,
}: CotiserFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: cotisationError } = await createCotisation(
        tontineId,
        amount,
        paymentMethod
      )
      if (cotisationError) throw cotisationError
      alert('Cotisation enregistrée avec succès !')
      onSuccess()
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h3>Cotiser</h3>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>Montant</label>
        <input type="text" value={`${amount} FCFA`} disabled />

        <label>Méthode de paiement</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cash">Espèces</option>
          <option value="momo">MTN MoMo</option>
          <option value="orange">Orange Money</option>
        </select>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Traitement...' : 'Confirmer'}
          </button>
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
