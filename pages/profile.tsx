import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/lib/supabase'
import { useRouter } from 'next/router'
import Navigation from '@/components/Navigation'
import { useState } from 'react'

export default function Profile() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [signOutLoading, setSignOutLoading] = useState(false)

  const handleSignOut = async () => {
    setSignOutLoading(true)
    await signOut()
    router.push('/')
  }

  if (loading) return <div className="container">Chargement...</div>

  return (
    <>
      <Head><title>Mon Profil - Tontine Facile</title></Head>
      <Navigation user={user} />
      <header><h1>Mon Profil</h1></header>
      <div className="container">
        <div className="card">
          <h3>Informations personnelles</h3>
          <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
          <p><strong>ID:</strong> {user?.id || 'N/A'}</p>
          <p><strong>Créé le:</strong> {user?.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR') : 'N/A'}</p>
          <button className="btn btn-outline" onClick={handleSignOut} disabled={signOutLoading} style={{ marginTop: '20px' }}>
            {signOutLoading ? 'Déconnexion...' : 'Déconnexion'}
          </button>
        </div>
      </div>
    </>
  )
}
