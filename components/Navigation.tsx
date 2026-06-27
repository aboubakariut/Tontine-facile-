import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation({ user }: any) {
  const router = useRouter()
  return (
    <nav className="bottom-nav">
      <Link href="/dashboard"><a className={router.pathname === '/dashboard' ? 'active' : ''}>📊 Accueil</a></Link>
      <Link href="/create-tontine"><a className={router.pathname === '/create-tontine' ? 'active' : ''}>➕ Créer</a></Link>
      <Link href="/profile"><a className={router.pathname === '/profile' ? 'active' : ''}>👤 Profil</a></Link>
    </nav>
  )
}
