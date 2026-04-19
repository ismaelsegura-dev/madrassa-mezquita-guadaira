import { createClient } from '@supabase/supabase-js'

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-key'

try {
  // Verificamos si la URL es construible, si el usuario puso "misitio.com" sin https:// fallará.
  new URL(supabaseUrl)
} catch (error) {
  console.error("La VITE_SUPABASE_URL provista en Vercel no es una ruta válida. Se usará el dummy.")
  supabaseUrl = 'https://dummy.supabase.co'
}

let safeInstance;
try {
  safeInstance = createClient(supabaseUrl, supabaseAnonKey)
} catch (e) {
  console.error("Fallo al crear cliente Supabase, usando dummy.")
  safeInstance = createClient('https://dummy.supabase.co', 'dummy-key')
}

export const supabase = safeInstance


