import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Book, User, Settings } from 'lucide-react'
import { supabase } from '../lib/supabase'

export const Dashboard = () => {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (!session) navigate('/')
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) navigate('/')
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Cargando...</div>
  if (!session) return null

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        borderBottom: '2px dashed var(--border-scribble)', paddingBottom: '1rem', marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: 0 }}>Espacio del Alumno</h1>
          <p className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--pencil-gray)' }}>
            Tu progreso de hoy empieza aquí.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span className="handwritten" style={{ color: 'var(--ink-blue)', fontSize: '1.1rem' }}>
            <User size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {session.user.email}
          </span>
          <button onClick={handleSignOut} className="scribble-button" style={{ 
            padding: '0.4rem 1rem', fontSize: '1rem', display: 'flex', gap: '5px', alignItems: 'center' 
          }}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 3fr) 1fr', gap: '2rem' }}>
        <section>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Book size={24} /> Temario Principal
          </h2>
          <div className="scribble-card" style={{ padding: '10px', height: '800px', borderRadius: '15px' }}>
            <iframe 
              src="/temario.pdf" 
              width="100%" 
              height="100%" 
              style={{ border: 'none', borderRadius: '10px' }}
              title="Temario de Árabe"
            />
          </div>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="scribble-card" style={{ padding: '1.5rem' }}>
            <h3>Tu Progreso</h3>
            <p className="handwritten">Aún no has completado ninguna lección hoy. ¡Empieza a leer el temario!</p>
            {/* Aquí en el futuro irán los checks de progreso */}
          </div>

          <div className="scribble-card" style={{ padding: '1.5rem', background: 'var(--highlight-yellow)' }}>
            <h3>Notas</h3>
            <textarea 
              className="handwritten"
              placeholder="Escribe aquí tus apuntes..."
              style={{
                width: '100%', height: '150px', background: 'transparent',
                border: '1px dashed var(--border-scribble)', padding: '10px',
                fontSize: '1.1rem', resize: 'vertical'
              }}
            />
          </div>
        </aside>
      </main>
    </div>
  )
}

export default Dashboard
