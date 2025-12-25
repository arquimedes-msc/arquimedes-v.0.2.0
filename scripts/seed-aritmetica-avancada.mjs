import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Criando Aritmética Avançada...\n');

// Criar disciplina
const [disciplineResult] = await conn.execute(
  `INSERT INTO disciplines (name, slug, description)
  VALUES (?, ?, ?)`,
  [
    'Aritmética Avançada',
    'aritmetica-avancada',
    'Domine técnicas avançadas de aritmética para concursos públicos: sistemas de numeração, divisibilidade, progressões, análise combinatória e raciocínio lógico quantitativo.'
  ]
);

const disciplineId = disciplineResult.insertId;
console.log(`✅ Disciplina criada: ID ${disciplineId}\n`);

// Criar módulos
const modulos = [
  {
    name: 'Sistemas de Numeração',
    slug: 'sistemas-numeracao',
    description: 'Explore sistemas de numeração decimal, binário, octal, hexadecimal e números romanos com conversões e operações.',
    order: 1
  },
  {
    name: 'Divisibilidade e Números Primos',
    slug: 'divisibilidade-primos',
    description: 'Domine critérios de divisibilidade, números primos, fatoração, MMC, MDC e problemas avançados de divisibilidade.',
    order: 2
  },
  {
    name: 'Progressões Aritméticas e Geométricas',
    slug: 'progressoes',
    description: 'Aprenda sequências numéricas, PA, PG, termos gerais, somas e aplicações em problemas de concursos.',
    order: 3
  },
  {
    name: 'Análise Combinatória Básica',
    slug: 'analise-combinatoria',
    description: 'Resolva problemas de contagem com princípio fundamental, permutações, arranjos e combinações.',
    order: 4
  },
  {
    name: 'Raciocínio Lógico Quantitativo',
    slug: 'raciocinio-logico',
    description: 'Desenvolva raciocínio lógico com problemas de sequências, idades, conjuntos e desafios de concursos.',
    order: 5
  }
];

console.log('📚 Criando 5 módulos...\n');

for (const modulo of modulos) {
  await conn.execute(
    `INSERT INTO modules (disciplineId, name, slug, description, \`order\`)
    VALUES (?, ?, ?, ?, ?)`,
    [disciplineId, modulo.name, modulo.slug, modulo.description, modulo.order]
  );
  console.log(`✅ Módulo ${modulo.order}: ${modulo.name}`);
}

console.log(`\n🎉 Aritmética Avançada criada com sucesso!`);
console.log(`📊 Disciplina ID: ${disciplineId}`);
console.log(`📚 5 módulos criados`);

await conn.end();
