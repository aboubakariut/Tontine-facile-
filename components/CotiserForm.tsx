import { useState } from 'react'
import { createCotisation } from '@/lib/supabase'

export default function CotiserForm({ tontineId, amount, onSuccess, onCancel }: any) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error: cotisationError } = await createCotisation(tontineId, amount, paymentMethod)
      if (cotisationError) throw cotisationError
      alert('Cotisation enregistrée !')
      onSuccess()
    } catch (error: any) {
      setError(error.message)
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
        <label>Méthode</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cash">Espèces</option>
          <option value="momo">MTN MoMo</option>
          <option value="orange">Orange Money</option>
        </select>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn" disabled={loading}>{loading ? 'Traitement...' : 'Confirmer'}</button>
          <button type="button" className="btn btn-outline" onClick={onCancel}>Annuler</button>
        </div>
      </form>
    </div>
  )
}
