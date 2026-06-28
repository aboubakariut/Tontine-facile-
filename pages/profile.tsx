import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/lib/supabase'
import { useRouter } from 'next/router'
import Navigation from '@/components/Navigation'
import { useEffect, useState } from 'react'

export default function Profile() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [signOutLoading, setSignOutLoading] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  const handleSignOut = async () => {
    setSignOutLoading(true)
    await signOut()
    router.push('/login')
  }

  if (loading) return <div className="container" style={{ textAlign: 'center', paddingTop: '40px' }}>Chargement...</div>
  if (!user) return null

  const dateInscription = user.created_at
    ? new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'N/A'

  return (
    <>
      <Head>
        <title>Mon Profil - Tontine Facile</title>
        <meta name="theme-color" content="#1d4ed8" />
      </Head>

      <Navigation user={user} />

      <div className="container">
        <div className="card">
          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d4ed8, #16a34a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: '900',
              flexShrink: 0,
            }}>
              {user.email?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div>
              <h3 style={{ marginBottom: '4px' }}>{user.user_metadata?.name ?? 'Utilisateur'}</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', opacity: 1 }}>{user.email}</p>
            </div>
          </div>

          <p><strong>Téléphone :</strong> {user.user_metadata?.phone ?? 'Non renseigné'}</p>
          <p style={{ marginTop: '8px' }}><strong>Inscrit le :</strong> {dateInscription}</p>
          <p style={{ marginTop: '8px', fontSize: '0.8rem', color: '#9ca3af', opacity: 1 }}>ID : {user.id}</p>
        </div>

        <div className="card">
          <h3>Actions</h3>
          <button
            className="btn btn-outline"
            onClick={handleSignOut}
            disabled={signOutLoading}
          >
            {signOutLoading ? 'Déconnexion...' : 'Se déconnecter'}
          </button>
        </div>
      </div>
    </>
  )
}
