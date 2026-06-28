import { useState } from 'react'
import { signIn, signUp } from '@/lib/supabase'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp(email, password, name, phone)
        if (signUpError) throw signUpError
        setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.')
        setIsSignUp(false)
        setEmail('')
        setPassword('')
        setName('')
        setPhone('')
      } else {
        const { error: signInError } = await signIn(email, password)
        if (signInError) throw signInError
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Tontine Facile - {isSignUp ? 'Inscription' : 'Connexion'}</title>
        <meta name="description" content="Gérez vos Adachi, njangi et tontines en toute transparence" />
        <meta name="theme-color" content="#1d4ed8" />
      </Head>

      <header>
        <p>Gérez vos Adachi / djangui en toute transparence</p>
      </header>

      <div className="container">
        <div className="card">
          <h3>{isSignUp ? 'Inscription' : 'Connexion'}</h3>

          {error && <div className="error">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <form onSubmit={handleAuth}>
            {isSignUp && (
              <>
                <label htmlFor="name">Nom complet <span style={{ color: '#991b1b' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="name"
                    type="text"
                    placeholder="Votre nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <label htmlFor="phone">Numéro WhatsApp <span style={{ color: '#991b1b' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+237 6XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <label htmlFor="email">Email <span style={{ color: '#991b1b' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label htmlFor="password">Mot de passe <span style={{ color: '#991b1b' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Chargement...' : isSignUp ? "S'inscrire" : 'Se connecter'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '16px' }}>
            {isSignUp ? 'Déjà inscrit ?' : 'Pas de compte ?'}{' '}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); setError(''); setSuccess('') }}
            >
              {isSignUp ? 'Connexion' : 'Inscrivez-vous'}
            </a>
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <small>Application de tontine – Ngaoundéré &amp; partout au Cameroun</small>
        </div>
      </div>
    </>
  )
}
