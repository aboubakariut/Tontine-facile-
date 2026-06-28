import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useTontineById } from '@/hooks/useTontines'
import { useCotisations } from '@/hooks/useCotisations'
import Navigation from '@/components/Navigation'
import CotiserForm from '@/components/CotiserForm'
import { useState } from 'react'

export default function TontineDetail() {
  const router = useRouter()
  const { id } = router.query
  const { user, loading: authLoading } = useAuth()
  const { tontine, loading: tontineLoading } = useTontineById(id as string)
  const { cotisations, loading: cotisationsLoading } = useCotisations(id as string)
  const [showCotiserForm, setShowCotiserForm] = useState(false)

  if (authLoading || tontineLoading) return <div className="container">Chargement...</div>
  if (!authLoading && !user) {
    router.push('/')
    return null
  }
  if (!tontine) return <div className="container"><p>Tontine non trouvée</p></div>

  const totalCotise = cotisations.reduce((sum: number, c: any) => sum + (c.amount || 0), 0)
  const progress = (totalCotise / (tontine.amount * tontine.total_members)) * 100

  return (
    <>
      <Head><title>{tontine.name} - Tontine Facile</title></Head>
      <Navigation user={user} />
      <header><h1>{tontine.name}</h1></header>
      <div className="container">
        <div className="card">
          <h3>Informations</h3>
          <p><strong>Créateur:</strong> {tontine.creator?.name || 'N/A'}</p>
          <p><strong>Montant:</strong> {tontine.amount} FCFA</p>
          <p><strong>Fréquence:</strong> {tontine.frequency}</p>
          <p><strong>Membres:</strong> {tontine.members?.length || 0} / {tontine.total_members}</p>
        </div>
        <div className="card">
          <h3>Progression</h3>
          <div style={{width: '100%', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden'}}>
            <div style={{width: `${Math.min(progress, 100)}%`, height: '100%', backgroundColor: '#16a34a'}} />
          </div>
          <p>Total: {totalCotise} / {tontine.amount * tontine.total_members} FCFA ({Math.round(progress)}%)</p>
        </div>
        {!showCotiserForm && <button className="btn" onClick={() => setShowCotiserForm(true)} style={{ width: '100%', marginBottom: '20px' }}>Cotiser</button>}
        {showCotiserForm && <CotiserForm tontineId={id as string} amount={tontine.amount} onSuccess={() => setShowCotiserForm(false)} onCancel={() => setShowCotiserForm(false)} />}
        <div className="card">
          <h3>Cotisations</h3>
          {cotisationsLoading ? <p>Chargement...</p> : cotisations.length === 0 ? <p>Aucune cotisation</p> : (
            <table style={{ width: '100%' }}>
              <thead>
                <tr><th>Membre</th><th>Montant</th><th>Date</th></tr>
              </thead>
              <tbody>
                {cotisations.map((c: any) => (
                  <tr key={c.id}>
                    <td>{c.user?.name}</td>
                    <td>{c.amount} FCFA</td>
                    <td>{new Date(c.created_at).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
