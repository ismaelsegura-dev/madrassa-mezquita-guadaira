import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import { supabase } from './lib/supabase'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'var(--font-main)' }}>Cargando la plataforma...</div>
  }

  return (
    <Router>
      <Routes>
        {/* Si el usuario está logueado, lo mandamos al dashboard; si no, ve el Landing */}
        <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <Landing />} />
        
        {/* Rutas protegidas */}
        <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/" replace />} />
        
        {/* Rutas futuras */}
        <Route path="/admin" element={<div>Dashboard Profesor</div>} />
      </Routes>
    </Router>
  )
}

export default App

