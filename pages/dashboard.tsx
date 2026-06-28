import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import { useTontines } from '@/hooks/useTontines'
import Navigation from '@/components/Navigation'

const FREQ_LABELS: Record<string, string> = {
  daily: 'Quotidienne',
  weekly: 'Hebdomadaire',
  biweekly: 'Bimensuelle',
  monthly: 'Mensuelle',
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  pending: 'En attente',
  completed: 'Terminée',
  cancelled: 'Annulée',
}

export default function Dashboard() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { tontines, loading: tontinesLoading } = useTontines()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  if (authLoading || tontinesLoading) {
    return <div className="container" style={{ textAlign: 'center', paddingTop: '40px' }}>Chargement...</div>
  }
  if (!user) return null

  const statusClass = (status: string) => {
    if (status === 'active') return 'badges success'
    if (status === 'pending') return 'badges warning'
    return 'badges danger'
  }

  return (
    <>
      <Head>
        <title>Mes Tontines - Tontine Facile</title>
        <meta name="theme-color" content="#1d4ed8" />
      </Head>

      <Navigation user={user} />

      <div className="container" style={{ paddingTop: '16px' }}>
        {router.query.created === '1' && (
          <div className="success-msg">Tontine créée avec succès !</div>
        )}

        {tontines.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '16px' }}>Aucune tontine pour le moment.</p>
            <button className="btn" onClick={() => router.push('/create-tontine')}>
              Créer votre première tontine
            </button>
          </div>
        ) : (
          <>
            {tontines.map((tontine: any) => (
              <div key={tontine.id} className="card">
                <h3>{tontine.name}</h3>
                <p>
                  <strong>Montant :</strong> {Number(tontine.amount).toLocaleString('fr-FR')} FCFA /{' '}
                  {FREQ_LABELS[tontine.frequency] ?? tontine.frequency}
                </p>
                <p>
                  <strong>Membres :</strong> {tontine.members?.length ?? 0} / {tontine.total_members}
                </p>
                <p>
                  <strong>Statut :</strong>{' '}
                  <span className={statusClass(tontine.status)}>
                    {STATUS_LABELS[tontine.status] ?? tontine.status}
                  </span>
                </p>
                <button
                  className="btn"
                  style={{ marginTop: '12px' }}
                  onClick={() => router.push(`/tontine/${tontine.id}`)}
                >
                  Voir détails
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}
