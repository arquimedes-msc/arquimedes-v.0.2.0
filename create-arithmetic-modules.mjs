import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.js';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

console.log('📚 Criando estrutura completa de módulos de Aritmética...\n');

// Buscar disciplina de Aritmética
const [arithmetic] = await db.select().from(schema.disciplines).where(eq(schema.disciplines.slug, 'aritmetica'));

if (!arithmetic) {
  console.error('❌ Disciplina "Aritmética" não encontrada!');
  process.exit(1);
}

// Estrutura completa de módulos de Aritmética (do zero ao avançado)
const modules = [
  // MÓDULOS EXISTENTES (1-4)
  {
    name: 'Adição e Subtração',
    slug: 'adicao-subtracao',
    description: 'Operações básicas de somar e subtrair números',
    order: 1,
    icon: '➕',
    color: '#10b981'
  },
  {
    name: 'Multiplicação',
    slug: 'multiplicacao',
    description: 'Multiplicação como soma repetida e tabuada',
    order: 2,
    icon: '✖️',
    color: '#8b5cf6'
  },
  {
    name: 'Divisão',
    slug: 'divisao',
    description: 'Divisão, quociente e resto',
    order: 3,
    icon: '➗',
    color: '#06b6d4'
  },
  {
    name: 'Frações',
    slug: 'fracoes',
    description: 'Partes de um todo, numerador e denominador',
    order: 4,
    icon: '🍕',
    color: '#f59e0b'
  },
  
  // NOVOS MÓDULOS (5-15)
  {
    name: 'Decimais',
    slug: 'decimais',
    description: 'Números com vírgula e casas decimais',
    order: 5,
    icon: '🔢',
    color: '#ec4899'
  },
  {
    name: 'Porcentagem',
    slug: 'porcentagem',
    description: 'Cálculos com percentuais e proporções',
    order: 6,
    icon: '%',
    color: '#14b8a6'
  },
  {
    name: 'Razão e Proporção',
    slug: 'razao-proporcao',
    description: 'Relações entre quantidades e regra de três',
    order: 7,
    icon: '⚖️',
    color: '#f97316'
  },
  {
    name: 'Potenciação',
    slug: 'potenciacao',
    description: 'Multiplicação repetida e expoentes',
    order: 8,
    icon: '²',
    color: '#6366f1'
  },
  {
    name: 'Radiciação',
    slug: 'radiciacao',
    description: 'Raiz quadrada, cúbica e operações inversas',
    order: 9,
    icon: '√',
    color: '#a855f7'
  },
  {
    name: 'Números Inteiros',
    slug: 'numeros-inteiros',
    description: 'Positivos, negativos e operações com sinais',
    order: 10,
    icon: '➖➕',
    color: '#ef4444'
  },
  {
    name: 'Múltiplos e Divisores',
    slug: 'multiplos-divisores',
    description: 'MMC, MDC e divisibilidade',
    order: 11,
    icon: '🔄',
    color: '#22c55e'
  },
  {
    name: 'Números Primos',
    slug: 'numeros-primos',
    description: 'Identificação e fatoração em primos',
    order: 12,
    icon: '🔐',
    color: '#3b82f6'
  },
  {
    name: 'Expressões Numéricas',
    slug: 'expressoes-numericas',
    description: 'Ordem de operações e parênteses',
    order: 13,
    icon: '🧮',
    color: '#eab308'
  },
  {
    name: 'Sistemas de Medidas',
    slug: 'sistemas-medidas',
    description: 'Comprimento, massa, tempo e conversões',
    order: 14,
    icon: '📏',
    color: '#06b6d4'
  },
  {
    name: 'Matemática Financeira Básica',
    slug: 'matematica-financeira',
    description: 'Juros simples, descontos e cálculos práticos',
    order: 15,
    icon: '💰',
    color: '#84cc16'
  }
];

console.log(`Criando ${modules.length} módulos para Aritmética...\n`);

for (const module of modules) {
  // Verificar se módulo já existe
  const [existing] = await db.select()
    .from(schema.modules)
    .where(eq(schema.modules.slug, module.slug));
  
  if (existing) {
    console.log(`⏭️  Módulo "${module.name}" já existe (pulando)`);
    continue;
  }
  
  // Criar módulo
  await db.insert(schema.modules).values({
    ...module,
    disciplineId: arithmetic.id
  });
  
  console.log(`✅ Módulo ${module.order}/${modules.length}: ${module.name}`);
}

console.log('\n✨ Estrutura de Aritmética criada com sucesso!');
console.log(`\n📊 Total: ${modules.length} módulos`);
console.log('   • 4 módulos com conteúdo rico (Adição, Multiplicação, Divisão, Frações)');
console.log('   • 11 módulos novos (placeholders para expansão futura)');

await connection.end();
