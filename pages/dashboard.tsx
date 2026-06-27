import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
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

  return (
    <>
      <Head><title>Tableau de bord - Tontine Facile</title></Head>
      <Navigation user={user} />
      <header><h1>Mes Tontines</h1></header>
      <div className="container">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <Link href="/create-tontine"><button className="btn">+ Créer une tontine</button></Link>
          <button className="btn btn-outline" onClick={handleSignOut} disabled={signOutLoading}>{signOutLoading ? 'Déconnexion...' : 'Déconnexion'}</button>
        </div>
        {tontines.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <p>Aucune tontine pour le moment.</p>
            <Link href="/create-tontine"><button className="btn">Créer votre première tontine</button></Link>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
            {tontines.map((tontine: any) => (
              <div key={tontine.id} className="card">
                <h3>{tontine.name}</h3>
                <p><strong>Montant:</strong> {tontine.amount} FCFA / {tontine.frequency}</p>
                <p><strong>Membres:</strong> {tontine.members?.length || 0} / {tontine.total_members}</p>
                <p><strong>Statut:</strong> <span className="badge success">{tontine.status}</span></p>
                <Link href={`/tontine/${tontine.id}`}><button className="btn" style={{ width: '100%', marginTop: '10px' }}>Voir détails</button></Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
