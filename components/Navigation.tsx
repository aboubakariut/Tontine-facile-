import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavigationProps {
  user: any
}

export default function Navigation({ user }: NavigationProps) {
  const router = useRouter()

  return (
    <nav className="bottom-nav">
      <Link href="/dashboard">
        <a className={router.pathname === '/dashboard' ? 'active' : ''}>
          <i className="fa fa-home"></i>
          <span>Accueil</span>
        </a>
      </Link>

      <Link href="/create-tontine">
        <a className={router.pathname === '/create-tontine' ? 'active' : ''}>
          <i className="fa fa-plus"></i>
          <span>Créer</span>
        </a>
      </Link>

      <Link href="/profile">
        <a className={router.pathname === '/profile' ? 'active' : ''}>
          <i className="fa fa-user"></i>
          <span>Profil</span>
        </a>
      </Link>
    </nav>
  )
}
