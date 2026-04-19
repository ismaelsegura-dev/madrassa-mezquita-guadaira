import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, PenTool, User, LogIn, Mail, Lock } from 'lucide-react'
import { supabase, currentUrl } from '../lib/supabase'

export const Landing = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/dashboard')
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        // Para este MVP vamos directo si no hay validación por email
        navigate('/dashboard') 
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="float-anim" style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '80vh' 
    }}>
      <div className="scribble-card" style={{ maxWidth: '600px', width: '90%', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>Clases de Árabe</h1>
        <h2 style={{ marginTop: '-1rem', textAlign: 'center', color: 'var(--pencil-gray)' }}>Mezquita Guadaíra</h2>
        
        <p className="handwritten" style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>
          "Aprender un idioma es tener una ventana más desde la que mirar al mundo."
        </p>

        {error && (
          <div style={{ background: '#ffcccc', color: '#cc0000', padding: '10px', borderRadius: '5px', marginBottom: '1rem', textAlign: 'center', wordBreak: 'break-all' }}>
            <strong>{error}</strong>
            <div style={{ fontSize: '0.85rem', marginTop: '5px', opacity: 0.8 }}>
              Diagnóstico: intentando conectar con URL: <code>{currentUrl}</code>
            </div>
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={20} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--ink-blue)' }} />
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '10px 10px 10px 40px', boxSizing: 'border-box',
                border: '2px solid var(--border-scribble)', borderRadius: '10px',
                fontFamily: 'var(--font-main)', fontSize: '1rem', background: 'transparent'
              }}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--ink-blue)' }} />
            <input 
              type="password" 
              placeholder="Contraseña" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '10px 10px 10px 40px', boxSizing: 'border-box',
                border: '2px solid var(--border-scribble)', borderRadius: '10px',
                fontFamily: 'var(--font-main)', fontSize: '1rem', background: 'transparent'
              }}
            />
          </div>

          <button type="submit" disabled={loading} className="scribble-button" style={{ 
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
          }}>
            <LogIn size={20} /> {loading ? "Procesando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: 'var(--ink-blue)', cursor: 'pointer', textDecoration: 'underline' }}
            className="handwritten"
          >
            {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <BookOpen size={32} color="var(--ink-blue)" />
            <p className="handwritten" style={{ margin: '5px 0' }}>Lecciones</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <PenTool size={32} color="var(--ink-blue)" />
            <p className="handwritten" style={{ margin: '5px 0' }}>Actividades</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <User size={32} color="var(--ink-blue)" />
            <p className="handwritten" style={{ margin: '5px 0' }}>Progreso</p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p className="handwritten" style={{ color: 'var(--pencil-gray)', fontSize: '0.9rem', opacity: 0.8 }}>
            Proyecto de la Mezquita de Alcalá de Guadaíra
          </p>
        </div>
      </div>
    </div>
  )
}

export default Landing
