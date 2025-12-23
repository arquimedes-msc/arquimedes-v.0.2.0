import postgres from 'postgres';

// Testar com pooler (porta 6543)
const connectionString = 'postgresql://postgres.njwaigzkmzhtwvxumpsg:Msc@2025@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

console.log('🔌 Testando conexão com Supabase (Pooler)...\n');

try {
  const sql = postgres(connectionString, {
    max: 1,
    connect_timeout: 10,
  });

  const result = await sql`SELECT version()`;
  
  console.log('✅ Conexão bem-sucedida!');
  console.log('📊 Versão do PostgreSQL:', result[0].version);
  
  await sql.end();
  
  console.log('\n✨ Supabase está pronto para uso!');
  process.exit(0);
} catch (error) {
  console.error('❌ Erro ao conectar:', error.message);
  process.exit(1);
}
