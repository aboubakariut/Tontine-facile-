import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation({ user }: any) {
  const router = useRouter()
  return (
    <nav className="bottom-nav">
      <Link href="/dashboard" className={router.pathname === '/dashboard' ? 'active' : ''}>Accueil</Link>
      <Link href="/create-tontine" className={router.pathname === '/create-tontine' ? 'active' : ''}>Créer</Link>
      <Link href="/profile" className={router.pathname === '/profile' ? 'active' : ''}>Profil</Link>
    </nav>
  )
}
