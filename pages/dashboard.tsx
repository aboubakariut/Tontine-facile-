import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import { useTontines } from '@/hooks/useTontines'
import { signOut } from '@/lib/supabase'
import Navigation from '@/components/Navigation'

export default function Dashboard() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { tontines, loading: tontinesLoading } = useTontines()
  const [signOutLoading, setSignOutLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [authLoading, user, router])

  const handleSignOut = async () => {
    setSignOutLoading(true)
    await signOut()
    router.push('/')
  }

  if (authLoading || tontinesLoading) return <div className="container" style={{ textAlign: 'center', paddingTop: '40px' }}>Chargement...</div>
  if (!user) return null

  return (
    <>
      <Head><title>Tableau de bord - Tontine Facile</title></Head>
      <Navigation user={user} />
      <header><h1>Mes Tontines</h1></header>
      <div className="container">
        {router.query.created === '1' && (
          <div className="success" style={{ marginBottom: '20px' }}>Tontine créée avec succès !</div>
        )}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className="btn" onClick={() => router.push('/create-tontine')}>+ Créer une tontine</button>
          <button className="btn btn-outline" onClick={handleSignOut} disabled={signOutLoading}>{signOutLoading ? 'Déconnexion...' : 'Déconnexion'}</button>
        </div>
        {tontines.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <p>Aucune tontine pour le moment.</p>
            <button className="btn" onClick={() => router.push('/create-tontine')} style={{ marginTop: '10px' }}>Créer votre première tontine</button>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
            {tontines.map((tontine: any) => (
              <div key={tontine.id} className="card">
                <h3>{tontine.name}</h3>
                <p><strong>Montant:</strong> {tontine.amount} FCFA / {tontine.frequency}</p>
                <p><strong>Membres:</strong> {tontine.members?.length || 0} / {tontine.total_members}</p>
                <p><strong>Statut:</strong> <span className="badge success">{tontine.status}</span></p>
                <button className="btn" style={{ width: '100%', marginTop: '10px' }} onClick={() => router.push(`/tontine/${tontine.id}`)}>Voir détails</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
