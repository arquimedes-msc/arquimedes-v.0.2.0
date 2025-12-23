import postgres from 'postgres';

const connectionString = 'postgresql://postgres:Msc@2025@db.njwaigzkmzhtwvxumpsg.supabase.co:5432/postgres';

console.log('🔌 Testando conexão com Supabase...\n');

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
