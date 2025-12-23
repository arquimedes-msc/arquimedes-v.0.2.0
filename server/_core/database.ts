import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";

/**
 * Adaptador de banco de dados dual
 * Permite alternar entre Manus (MySQL) e Supabase (PostgreSQL)
 */

type DatabaseMode = 'manus' | 'supabase';

const DB_MODE: DatabaseMode = (process.env.DB_MODE as DatabaseMode) || 'manus';

let _db: ReturnType<typeof drizzleMysql> | ReturnType<typeof drizzlePostgres> | null = null;

export async function getDb() {
  if (_db) return _db;

  try {
    if (DB_MODE === 'supabase') {
      console.log('[Database] Conectando ao Supabase (PostgreSQL)...');
      
      const connectionString = process.env.SUPABASE_DATABASE_URL;
      
      if (!connectionString) {
        throw new Error('SUPABASE_DATABASE_URL não configurada');
      }

      const client = postgres(connectionString, {
        max: 10,
        idle_timeout: 20,
        connect_timeout: 10,
      });

      _db = drizzlePostgres(client);
      console.log('[Database] ✅ Conectado ao Supabase');
      
    } else {
      console.log('[Database] Conectando ao Manus (MySQL/TiDB)...');
      
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL não configurada');
      }

      _db = drizzleMysql(process.env.DATABASE_URL);
      console.log('[Database] ✅ Conectado ao Manus');
    }

    return _db;
  } catch (error) {
    console.error('[Database] ❌ Erro ao conectar:', error);
    _db = null;
    throw error;
  }
}

export function getDatabaseMode(): DatabaseMode {
  return DB_MODE;
}

export function isSupabase(): boolean {
  return DB_MODE === 'supabase';
}

export function isManus(): boolean {
  return DB_MODE === 'manus';
}

/**
 * Informações sobre o modo atual
 */
export function getDatabaseInfo() {
  return {
    mode: DB_MODE,
    type: DB_MODE === 'supabase' ? 'PostgreSQL' : 'MySQL/TiDB',
    provider: DB_MODE === 'supabase' ? 'Supabase' : 'Manus',
    description: DB_MODE === 'supabase' 
      ? 'Banco de produção permanente' 
      : 'Banco de desenvolvimento'
  };
}
