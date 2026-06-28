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
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Tontine Facile - Connexion</title>
      </Head>
      <div className="splash">
        <div className="logo">Tontine Facile</div>
        <div className="slogan">Gérez vos Adachi et njangi en toute transparence</div>
        <div className="card" style={{ marginTop: '40px', maxWidth: '400px' }}>
          <h2>{isSignUp ? 'Inscription' : 'Connexion'}</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <form onSubmit={handleAuth}>
            {isSignUp && (
              <>
                <label>Nom complet *</label>
                <input type="text" placeholder="Votre nom" value={name} onChange={(e) => setName(e.target.value)} required />
                <label>Téléphone WhatsApp *</label>
                <input type="tel" placeholder="+237 6XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </>
            )}
            <label>Email *</label>
            <input type="email" placeholder="votre@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Mot de passe *</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="btn" disabled={loading}>{loading ? 'Chargement...' : isSignUp ? "S'inscrire" : 'Se connecter'}</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
            {isSignUp ? 'Déjà inscrit ?' : 'Pas de compte ?'}{' '}
            <button onClick={() => {setIsSignUp(!isSignUp); setError('')}} style={{background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', textDecoration: 'underline'}}>
              {isSignUp ? 'Connexion' : 'Inscription'}
            </button>
          </p>
        </div>
        <p style={{ marginTop: '40px', fontSize: '0.85rem', opacity: 0.8 }}>Version 1.0 • Ngaoundéré, Cameroun</p>
      </div>
    </>
  )
}
