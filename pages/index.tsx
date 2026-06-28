import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCurrentUser } from '@/lib/supabase'

export default function Splash() {
  const router = useRouter()

  useEffect(() => {
    // Si déjà connecté, aller directement au dashboard
    getCurrentUser().then(({ user }) => {
      if (user) router.push('/dashboard')
    })
  }, [router])

  return (
    <>
      <Head>
        <title>Tontine Facile</title>
        <meta name="description" content="Gérez vos Adachi, njangi et tontines en toute transparence" />
        <meta name="theme-color" content="#1d4ed8" />
      </Head>
      <div className="splash-page">
        <div className="splash-logo">Tontine Facile</div>
        <p className="splash-slogan">Gérez vos Adachi et njangi en toute transparence</p>
        <div style={{ margin: '32px 0' }}>
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.9}
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <button className="btn-start" onClick={() => router.push('/login')}>
          Commencer
        </button>
        <p style={{ marginTop: '40px', fontSize: '0.9rem', opacity: 0.8 }}>
          Version 1.0 &bull; Ngaoundéré, Cameroun
        </p>
      </div>
    </>
  )
}
