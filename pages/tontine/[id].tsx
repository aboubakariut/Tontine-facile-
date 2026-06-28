import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import { useTontineById } from '@/hooks/useTontines'
import { useCotisations } from '@/hooks/useCotisations'
import Navigation from '@/components/Navigation'
import CotiserForm from '@/components/CotiserForm'
import { useState } from 'react'

const FREQ_LABELS: Record<string, string> = {
  daily: 'Quotidienne',
  weekly: 'Hebdomadaire',
  biweekly: 'Bimensuelle',
  monthly: 'Mensuelle',
}

export default function TontineDetail() {
  const router = useRouter()
  const { id } = router.query
  const { user, loading: authLoading } = useAuth()
  const { tontine, loading: tontineLoading } = useTontineById(id as string)
  const { cotisations, loading: cotisationsLoading } = useCotisations(id as string)
  const [showCotiserForm, setShowCotiserForm] = useState(false)

  if (authLoading || tontineLoading) {
    return <div className="container" style={{ textAlign: 'center', paddingTop: '40px' }}>Chargement...</div>
  }
  if (!authLoading && !user) {
    router.push('/login')
    return null
  }
  if (!tontine) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <p>Tontine introuvable.</p>
          <button className="btn" style={{ marginTop: '12px' }} onClick={() => router.push('/dashboard')}>
            Retour au dashboard
          </button>
        </div>
      </div>
    )
  }

  const totalCotise = cotisations.reduce((sum: number, c: any) => sum + (c.amount || 0), 0)
  const cagnotteTotale = tontine.amount * tontine.total_members
  const progress = cagnotteTotale > 0 ? (totalCotise / cagnotteTotale) * 100 : 0

  const dateDebut = tontine.start_date
    ? new Date(tontine.start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Non définie'

  return (
    <>
      <Head>
        <title>{tontine.name} - Tontine Facile</title>
        <meta name="theme-color" content="#1d4ed8" />
      </Head>

      <Navigation user={user} />

      <div className="container">
        {/* Informations générales */}
        <div className="card">
          <h3>Informations</h3>
          <p><strong>Montant par tour :</strong> {Number(tontine.amount).toLocaleString('fr-FR')} FCFA</p>
          <p><strong>Fréquence :</strong> {FREQ_LABELS[tontine.frequency] ?? tontine.frequency}</p>
          <p><strong>Nombre de membres :</strong> {tontine.members?.length ?? 0} / {tontine.total_members}</p>
          <p><strong>Date de début :</strong> {dateDebut}</p>
          <p><strong>Cagnotte totale levée :</strong> {Number(totalCotise).toLocaleString('fr-FR')} FCFA</p>
          <span className="badges success" style={{ marginTop: '8px', display: 'inline-block' }}>
            {tontine.status === 'active' ? 'Active' : tontine.status}
          </span>
        </div>

        {/* Progression */}
        <div className="card">
          <h3>Progression</h3>
          <div style={{
            width: '100%',
            height: '16px',
            backgroundColor: '#e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden',
            margin: '8px 0 12px',
          }}>
            <div style={{
              width: `${Math.min(progress, 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #16a34a, #22c55e)',
              borderRadius: '8px',
              transition: 'width 0.5s ease',
            }} />
          </div>
          <p>
            <strong>{Number(totalCotise).toLocaleString('fr-FR')} FCFA</strong> /{' '}
            {Number(cagnotteTotale).toLocaleString('fr-FR')} FCFA ({Math.round(progress)}%)
          </p>
        </div>

        {/* Actions cotisation */}
        {!showCotiserForm ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn" style={{ flex: 1 }} onClick={() => setShowCotiserForm(true)}>
              Cotiser maintenant
            </button>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => router.push('/dashboard')}>
              Retour
            </button>
          </div>
        ) : (
          <CotiserForm
            tontineId={id as string}
            amount={tontine.amount}
            onSuccess={() => setShowCotiserForm(false)}
            onCancel={() => setShowCotiserForm(false)}
          />
        )}

        {/* Historique des cotisations */}
        <div className="card">
          <h3>Historique des cotisations</h3>
          {cotisationsLoading ? (
            <p>Chargement...</p>
          ) : cotisations.length === 0 ? (
            <p>Aucune cotisation enregistrée pour l&apos;instant.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '8px 4px', color: '#1e40af', fontWeight: '700', fontSize: '0.9rem' }}>Membre</th>
                  <th style={{ textAlign: 'right', padding: '8px 4px', color: '#1e40af', fontWeight: '700', fontSize: '0.9rem' }}>Montant</th>
                  <th style={{ textAlign: 'right', padding: '8px 4px', color: '#1e40af', fontWeight: '700', fontSize: '0.9rem' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {cotisations.map((c: any) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '10px 4px' }}>{c.user?.name ?? c.user_id?.slice(0, 8) + '…'}</td>
                    <td style={{ padding: '10px 4px', textAlign: 'right', color: '#15803d', fontWeight: '600' }}>
                      {Number(c.amount).toLocaleString('fr-FR')} FCFA
                    </td>
                    <td style={{ padding: '10px 4px', textAlign: 'right', fontSize: '0.85rem', color: '#6b7280' }}>
                      {new Date(c.created_at).toLocaleDateString('fr-FR')}
                    </td>
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
