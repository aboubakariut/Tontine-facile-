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
  const { cotisations, loading: cotisationsLoading, addCotisation } = useCotisations(
    id as string
  )
  const [showCotiserForm, setShowCotiserForm] = useState(false)

  if (authLoading || tontineLoading) {
    return <div className="container">Chargement...</div>
  }

  if (!tontine) {
    return (
      <>
        <Head>
          <title>Tontine non trouvée</title>
        </Head>
        <div className="container">
          <p>Tontine non trouvée</p>
          <Link href="/dashboard">
            <button className="btn">Retour au dashboard</button>
          </Link>
        </div>
      </>
    )
  }

  const totalCotise = cotisations.reduce(
    (sum: number, c: any) => sum + (c.amount || 0),
    0
  )
  const progress = (totalCotise / (tontine.amount * tontine.total_members)) * 100

  return (
    <>
      <Head>
        <title>{tontine.name} - Tontine Facile</title>
      </Head>
      <Navigation user={user} />
      <header>
        <h1>{tontine.name}</h1>
      </header>

      <div className="container">
        <div className="card">
          <h3>Informations</h3>
          <p>
            <strong>Créateur:</strong> {tontine.creator?.name || 'N/A'}
          </p>
          <p>
            <strong>Montant par cotisation:</strong> {tontine.amount} FCFA
          </p>
          <p>
            <strong>Fréquence:</strong> {tontine.frequency}
          </p>
          <p>
            <strong>Membres:</strong> {tontine.members?.length || 0} / {tontine.total_members}
          </p>
          <p>
            <strong>Statut:</strong> <span className="badge success">{tontine.status}</span>
          </p>
          {tontine.description && (
            <p>
              <strong>Description:</strong> {tontine.description}
            </p>
          )}
        </div>

        <div className="card">
          <h3>Progression des cotisations</h3>
          <div style={{ marginBottom: '10px' }}>
            <div
              style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#e5e7eb',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  height: '100%',
                  backgroundColor: '#16a34a',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
          <p>
            Total cotisé: {totalCotise} FCFA / {tontine.amount * tontine.total_members} FCFA ({Math.round(progress)}%)
          </p>
        </div>

        {showCotiserForm && (
          <CotiserForm
            tontineId={id as string}
            amount={tontine.amount}
            onSuccess={() => {
              setShowCotiserForm(false)
            }}
            onCancel={() => setShowCotiserForm(false)}
          />
        )}

        {!showCotiserForm && (
          <button
            className="btn"
            onClick={() => setShowCotiserForm(true)}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            Cotiser maintenant
          </button>
        )}

        <div className="card">
          <h3>Cotisations récentes</h3>
          {cotisationsLoading ? (
            <p>Chargement...</p>
          ) : cotisations.length === 0 ? (
            <p>Aucune cotisation pour le moment</p>
          ) : (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Membre</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {cotisations.map((cotisation: any) => (
                  <tr key={cotisation.id}>
                    <td>{cotisation.user?.name || 'N/A'}</td>
                    <td>{cotisation.amount} FCFA</td>
                    <td>
                      <span
                        className={`badge ${cotisation.status === 'completed' ? 'success' : 'warning'}`}
                      >
                        {cotisation.status}
                      </span>
                    </td>
                    <td>
                      {new Date(cotisation.created_at).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card">
          <h3>Membres</h3>
          {tontine.members?.length === 0 ? (
            <p>Aucun membre pour le moment</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {tontine.members?.map((member: any) => (
                <li
                  key={member.id}
                  style={{
                    padding: '10px 0',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <strong>{member.user?.name || 'N/A'}</strong>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#4b5563' }}>
                    {member.user?.phone}
                  </p>
                  <span
                    className={`badge ${member.status === 'active' ? 'success' : 'warning'}`}
                  >
                    {member.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
