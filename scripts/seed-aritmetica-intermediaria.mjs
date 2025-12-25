import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('🚀 Criando Aritmética Intermediária...\n');

// 1. Criar disciplina Aritmética Intermediária
const disciplineId = 30004;
const disciplineName = 'Aritmética Intermediária';
const disciplineSlug = 'aritmetica-intermediaria';

await conn.execute(`
  INSERT INTO disciplines (id, name, slug, description, \`order\`)
  VALUES (?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    description = VALUES(description)
`, [
  disciplineId,
  disciplineName,
  disciplineSlug,
  'Desenvolva raciocínio matemático e resolva problemas práticos do cotidiano com números inteiros, racionais, potenciação, razão, proporção e estatística básica.',
  3, // Ordem: depois de Aritmética Básica e Álgebra Básica
]);

console.log(`✅ Disciplina criada: ${disciplineName} (ID: ${disciplineId})`);

// 2. Criar 5 módulos
const modules = [
  {
    id: 180006,
    name: 'Números Inteiros e Racionais',
    slug: 'numeros-inteiros-racionais',
    description: 'Domine operações com números negativos, comparação, ordenação e números racionais (frações, decimais, porcentagens).',
    order: 1,
    estimatedMinutes: 210, // 3h30min
  },
  {
    id: 180007,
    name: 'Potenciação e Radiciação Avançadas',
    slug: 'potenciacao-radiciacao-avancadas',
    description: 'Aprenda propriedades das potências, raízes, notação científica e resolva problemas avançados de crescimento exponencial.',
    order: 2,
    estimatedMinutes: 210,
  },
  {
    id: 180008,
    name: 'Razão, Proporção e Regra de Três',
    slug: 'razao-proporcao-regra-tres',
    description: 'Resolva problemas práticos com razão, proporção, regra de três simples e composta, e divisão proporcional.',
    order: 3,
    estimatedMinutes: 210,
  },
  {
    id: 180009,
    name: 'Porcentagem Avançada',
    slug: 'porcentagem-avancada',
    description: 'Calcule aumentos e descontos sucessivos, juros simples e compostos, e aplique porcentagens em matemática financeira.',
    order: 4,
    estimatedMinutes: 210,
  },
  {
    id: 180010,
    name: 'Estatística Descritiva Básica',
    slug: 'estatistica-descritiva-basica',
    description: 'Interprete gráficos, calcule média, mediana e moda, e analise tabelas de frequência e distribuições percentuais.',
    order: 5,
    estimatedMinutes: 210,
  },
];

for (const module of modules) {
  await conn.execute(`
    INSERT INTO modules (id, disciplineId, name, slug, description, \`order\`)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      description = VALUES(description)
  `, [
    module.id,
    disciplineId,
    module.name,
    module.slug,
    module.description,
    module.order,
  ]);
  
  console.log(`✅ Módulo ${module.order}: ${module.name} (ID: ${module.id})`);
}

console.log('\n🎉 Aritmética Intermediária criada com sucesso!');
console.log(`📊 Total: 1 disciplina + 5 módulos`);

await conn.end();
