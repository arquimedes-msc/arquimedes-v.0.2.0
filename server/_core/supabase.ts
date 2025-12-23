import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://njwaigzkmzhtwvxumpsg.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_TAy7GsDpxc--jY8s49H03Q_jwOIDeqO';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'sb_secret_AplbxpeLKzk4bEcAqFa5xg_qXA57CWT';

// Cliente público (para operações do lado do cliente)
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cliente admin (para operações privilegiadas no servidor)
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// String de conexão PostgreSQL para Drizzle
export const SUPABASE_DATABASE_URL = process.env.SUPABASE_DATABASE_URL || 
  `postgresql://postgres:Msc@2025@db.njwaigzkmzhtwvxumpsg.supabase.co:5432/postgres`;

console.log('[Supabase] Cliente inicializado:', SUPABASE_URL);
