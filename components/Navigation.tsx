'use client'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signOut } from '@/lib/supabase'

interface NavigationProps {
  user?: any
}

export default function Navigation({ user }: NavigationProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const openSidebar = () => setSidebarOpen(true)
  const closeSidebar = () => setSidebarOpen(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    closeSidebar()
    await signOut()
    router.push('/')
  }

  const isActive = (path: string) => router.pathname === path

  const sidebarLinks = [
    { href: '/', label: 'Accueil', icon: HomeIcon },
    { href: '/dashboard', label: 'Mes Tontines', icon: UsersIcon },
    { href: '/create-tontine', label: 'Créer tontine', icon: PlusCircleIcon },
    { href: '/profile', label: 'Profil', icon: UserIcon },
  ]

  return (
    <>
      {/* Sidebar */}
      <div id="sidebar" className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-btn" onClick={closeSidebar} aria-label="Fermer le menu">
            &times;
          </button>
        </div>
        <ul className="sidebar-menu">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                className={isActive(href) ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); closeSidebar(); router.push(href) }}
              >
                <Icon />
                <span>{label}</span>
              </a>
            </li>
          ))}
          <li className="sidebar-logout">
            <button
              className="sidebar-btn logout"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              <LogoutIcon />
              <span>{signingOut ? 'Déconnexion...' : 'Déconnexion'}</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      <div
        className={`overlay${sidebarOpen ? ' show' : ''}`}
        onClick={closeSidebar}
      />

      {/* Header avec bouton menu */}
      <header>
        <div className="header-content">
          <h2 className="h2">Tontine Facile</h2>
          <button
            id="menu-toggle"
            className="menu-btn"
            onClick={openSidebar}
            aria-label="Ouvrir le menu"
          >
            <BarsIcon />
          </button>
        </div>
      </header>

      {/* Bottom Nav Premium */}
      <nav className="bottom-nav premium" id="bottom-nav">
        <button
          className={`nav-item${isActive('/dashboard') ? ' active' : ''}`}
          onClick={() => router.push('/dashboard')}
        >
          <UsersIcon />
          <span>Tontines</span>
        </button>

        <button
          className={`nav-item${isActive('/') ? ' active' : ''}`}
          onClick={() => router.push('/')}
        >
          <HomeIcon />
          <span>Accueil</span>
        </button>

        {/* FAB central */}
        <div className="fab-container">
          <button className="fab" onClick={() => router.push('/create-tontine')} aria-label="Créer une tontine">
            <PlusIcon />
          </button>
        </div>

        <button
          className="nav-item"
          onClick={() => router.push('/notifications')}
        >
          <div className="icon-wrapper">
            <BellIcon />
            <span className="notif-badge">3</span>
          </div>
          <span>Alertes</span>
        </button>

        <button
          className={`nav-item${isActive('/profile') ? ' active' : ''}`}
          onClick={() => router.push('/profile')}
        >
          <UserCircleIcon />
          <span>Profil</span>
        </button>
      </nav>
    </>
  )
}

/* SVG Icons — inline pour éviter toute dépendance externe */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

function UserCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="10" r="3"/>
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
    </svg>
  )
}

function PlusCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

function BarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.6rem', height: '1.6rem' }}>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}
