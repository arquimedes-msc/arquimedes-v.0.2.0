import mysql from 'mysql2/promise';

// Configuração do banco de dados
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || 'gateway01.us-east-1.prod.aws.tidbcloud.com',
  port: parseInt(process.env.DB_PORT || '4000'),
  user: process.env.DB_USER || '2bFzLSJPZSs2Mxd.root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'arquimedes',
  ssl: { rejectUnauthorized: true }
});

// Função para extrair ID do YouTube da URL
function extractYoutubeId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/playlist\?list=)([^&\s]+)/);
  return match ? match[1] : url;
}

// Lista de vídeos para cadastrar
const videos = [
  // ===== ARITMÉTICA BÁSICA (disciplineId: 1) =====
  
  // Adição (moduleId: 1)
  {
    title: "Adição e Subtração - Aula 1 - Matemática Básica",
    youtubeId: "25MKvVixayM",
    duration: "30:00",
    description: "Aula completa sobre adição e subtração com o Professor Ferretto. Aprenda os conceitos fundamentais das operações básicas.",
    disciplineId: 1,
    moduleId: 1
  },
  {
    title: "Matemática do Zero - Adição e Subtração",
    youtubeId: "71Y9WGFtv24",
    duration: "15:00",
    description: "Aprenda adição e subtração do zero com o Brasil Escola. Ideal para iniciantes.",
    disciplineId: 1,
    moduleId: 1
  },
  
  // Subtração (moduleId: 90002)
  {
    title: "Adição e Subtração - Matemática Básica",
    youtubeId: "cDzvSd3W4D8",
    duration: "20:00",
    description: "Aula de adição e subtração com a professora Gis. Explicação clara e didática.",
    disciplineId: 1,
    moduleId: 90002
  },
  
  // Multiplicação (moduleId: 2)
  {
    title: "Matemática Básica - Aula 3 - Multiplicação",
    youtubeId: "BetgRvNQEC0",
    duration: "35:00",
    description: "Aula completa sobre multiplicação com o Professor Ferretto. Aprenda a multiplicar de forma fácil.",
    disciplineId: 1,
    moduleId: 2
  },
  {
    title: "Multiplicação e Divisão - Operações com Números",
    youtubeId: "0UGJRHq2PS4",
    duration: "40:00",
    description: "Aula sobre multiplicação e divisão com o Professor Ferretto.",
    disciplineId: 1,
    moduleId: 2
  },
  
  // Divisão (moduleId: 3)
  {
    title: "Matemática Básica - Aula 4 - Divisão",
    youtubeId: "GpnfZHB3Rpw",
    duration: "30:00",
    description: "Aula completa sobre divisão com o Professor Ferretto. Aprenda a dividir passo a passo.",
    disciplineId: 1,
    moduleId: 3
  },
  {
    title: "Multiplicação e Divisão de Números Naturais",
    youtubeId: "o2SJ5pUp_00",
    duration: "25:00",
    description: "Aula sobre multiplicação e divisão com a professora Gis.",
    disciplineId: 1,
    moduleId: 3
  },
  
  // Porcentagem (moduleId: 120006)
  {
    title: "Porcentagem - Como Calcular Porcentagem",
    youtubeId: "OjOyNmTt7Mw",
    duration: "20:00",
    description: "Aprenda a calcular porcentagem de forma fácil com a professora Gis.",
    disciplineId: 1,
    moduleId: 120006
  },
  {
    title: "Aprenda Porcentagem em 8 Minutos",
    youtubeId: "azedx0uou64",
    duration: "8:00",
    description: "Aprenda porcentagem rapidamente com o Dicasdemat (Sandro Curió).",
    disciplineId: 1,
    moduleId: 120006
  },
  
  // Frações (moduleId: 120001)
  {
    title: "Matemática Básica - Aula 13 - Frações (parte 1)",
    youtubeId: "i2GEeGSrZ_E",
    duration: "38:00",
    description: "Aula completa sobre frações com o Professor Ferretto. Introdução ao conceito de frações.",
    disciplineId: 1,
    moduleId: 120001
  },
  {
    title: "Frações - Operações Básicas - Matemática Básica",
    youtubeId: "SgJpB78R7x0",
    duration: "35:00",
    description: "Aprenda as operações básicas com frações: soma, subtração, multiplicação e divisão.",
    disciplineId: 1,
    moduleId: 120001
  },
  
  // Números Decimais (moduleId: 120002)
  {
    title: "Números Decimais 5º ano",
    youtubeId: "13jlmVyGrLo",
    duration: "20:00",
    description: "Aprenda sobre números decimais com a professora Gis. Ideal para iniciantes.",
    disciplineId: 1,
    moduleId: 120002
  },
  {
    title: "Números Decimais - Multiplicação e Divisão",
    youtubeId: "9LeCpU_cR0E",
    duration: "25:00",
    description: "Aprenda a multiplicar e dividir números decimais com o Professor Ferretto.",
    disciplineId: 1,
    moduleId: 120002
  },
  
  // Razão e Proporção (moduleId: 120003)
  {
    title: "Regra de Três - Razão e Proporção",
    youtubeId: "Got_aynoOHc",
    duration: "25:00",
    description: "Aprenda razão, proporção e regra de três de forma completa.",
    disciplineId: 1,
    moduleId: 120003
  },
  {
    title: "Razão, Proporção e Regra de Três - Revisão ENEM",
    youtubeId: "nk3VE7ChRNg",
    duration: "30:00",
    description: "Revisão completa de razão, proporção e regra de três para o ENEM com o Matemática Rio.",
    disciplineId: 1,
    moduleId: 120003
  },
  
  // Potenciação e Radiciação (moduleId: 120004)
  {
    title: "Potenciação - Definição e Propriedades",
    youtubeId: "4Vfw1XiHTpM",
    duration: "35:00",
    description: "Aula completa sobre potenciação com o Professor Ferretto. Aprenda as propriedades das potências.",
    disciplineId: 1,
    moduleId: 120004
  },
  {
    title: "Radiciação - Definição e Propriedades",
    youtubeId: "QmIjZgKhAEo",
    duration: "37:00",
    description: "Aula completa sobre radiciação com o Professor Ferretto. Aprenda as propriedades das raízes.",
    disciplineId: 1,
    moduleId: 120004
  },
  
  // Números Inteiros (moduleId: 120005)
  {
    title: "O Conjunto dos Números Inteiros (Z)",
    youtubeId: "fmiw3ksXOmk",
    duration: "15:00",
    description: "Aprenda sobre o conjunto dos números inteiros com o canal Vivendo a Matemática.",
    disciplineId: 1,
    moduleId: 120005
  },
  {
    title: "Operações com Números Inteiros",
    youtubeId: "FeEE5sJaUdM",
    duration: "20:00",
    description: "Aprenda a fazer operações com números inteiros (positivos e negativos) com a professora Gis.",
    disciplineId: 1,
    moduleId: 120005
  },
  
  // ===== ARITMÉTICA INTERMEDIÁRIA (disciplineId: 30004) =====
  
  // Números Inteiros e Racionais (moduleId: 180006)
  {
    title: "O que são Números Inteiros",
    youtubeId: "MxRvYKxCswE",
    duration: "20:00",
    description: "Entenda o que são números inteiros com o Professor Ferretto.",
    disciplineId: 30004,
    moduleId: 180006
  },
  {
    title: "Operações com Números Inteiros - Rápido e Fácil",
    youtubeId: "IOyR59NRb7M",
    duration: "15:00",
    description: "Aprenda operações com números inteiros de forma rápida com o Dicasdemat.",
    disciplineId: 30004,
    moduleId: 180006
  },
  
  // Potenciação e Radiciação Avançadas (moduleId: 180007)
  {
    title: "Matemática Básica - Aula 16 - Potências",
    youtubeId: "vA8j9nqBlBM",
    duration: "40:00",
    description: "Aula avançada sobre potências com o Professor Ferretto.",
    disciplineId: 30004,
    moduleId: 180007
  },
  {
    title: "Matemática Básica - Aula 19 - Radiciação (parte 1)",
    youtubeId: "HOc9gSqbJ-8",
    duration: "35:00",
    description: "Aula avançada sobre radiciação com o Professor Ferretto.",
    disciplineId: 30004,
    moduleId: 180007
  },
  
  // Razão, Proporção e Regra de Três (moduleId: 180008)
  {
    title: "Regra de Três Simples e Composta",
    youtubeId: "Got_aynoOHc",
    duration: "25:00",
    description: "Aprenda regra de três simples e composta de forma completa.",
    disciplineId: 30004,
    moduleId: 180008
  },
  
  // Porcentagem Avançada (moduleId: 180009)
  {
    title: "Porcentagem - Explicação Passo a Passo",
    youtubeId: "XpEMJ4rq9aQ",
    duration: "20:00",
    description: "Aprenda porcentagem avançada passo a passo.",
    disciplineId: 30004,
    moduleId: 180009
  },
  {
    title: "Como Calcular Porcentagem em 5 Minutos",
    youtubeId: "UDcEESqNlHw",
    duration: "5:00",
    description: "Aprenda a calcular porcentagem rapidamente com o Dicasdemat.",
    disciplineId: 30004,
    moduleId: 180009
  },
  
  // Estatística Descritiva Básica (moduleId: 180010)
  {
    title: "Estatística - Média, Moda e Mediana",
    youtubeId: "2KjlM-5FVqA",
    duration: "25:00",
    description: "Aprenda média, moda e mediana com o Professor Ferretto.",
    disciplineId: 30004,
    moduleId: 180010
  },
  {
    title: "Média, Moda e Mediana - Estatística",
    youtubeId: "cQkiT3bDPM4",
    duration: "20:00",
    description: "Aprenda medidas de tendência central com a professora Gis.",
    disciplineId: 30004,
    moduleId: 180010
  },
  
  // ===== ARITMÉTICA AVANÇADA (disciplineId: 120001) =====
  
  // Sistemas de Numeração (moduleId: 240001)
  {
    title: "Sistema Binário - Número Binário em Decimal",
    youtubeId: "O9d6UtzpSVY",
    duration: "15:00",
    description: "Aprenda a converter números binários para decimal com a professora Gis.",
    disciplineId: 120001,
    moduleId: 240001
  },
  {
    title: "Sistemas de Numeração - Conversão Binário Decimal",
    youtubeId: "86lI785k6GQ",
    duration: "20:00",
    description: "Aprenda conversão entre sistemas de numeração binário e decimal.",
    disciplineId: 120001,
    moduleId: 240001
  },
  
  // Divisibilidade e Números Primos (moduleId: 240002)
  {
    title: "Critérios de Divisibilidade - Regras",
    youtubeId: "RAXp2qjhA1M",
    duration: "25:00",
    description: "Aprenda os critérios de divisibilidade com a professora Gis.",
    disciplineId: 120001,
    moduleId: 240002
  },
  {
    title: "Divisibilidade de Números Primos",
    youtubeId: "VtHPyH4uL-k",
    duration: "15:00",
    description: "Aprenda sobre divisibilidade e números primos.",
    disciplineId: 120001,
    moduleId: 240002
  },
  
  // Progressões Aritméticas e Geométricas (moduleId: 240003)
  {
    title: "Progressão Aritmética PA - Introdução",
    youtubeId: "TC2HcZV3mGo",
    duration: "30:00",
    description: "Introdução à Progressão Aritmética (PA) com o Professor Ferretto.",
    disciplineId: 120001,
    moduleId: 240003
  },
  {
    title: "Progressão Geométrica PG - Introdução",
    youtubeId: "Jad_XG9bDCE",
    duration: "25:00",
    description: "Introdução à Progressão Geométrica (PG) com o Professor Ferretto.",
    disciplineId: 120001,
    moduleId: 240003
  },
  
  // Análise Combinatória Básica (moduleId: 240004)
  {
    title: "Análise Combinatória - Permutação, Arranjo",
    youtubeId: "_8mZOSXCRp8",
    duration: "20:00",
    description: "Aprenda permutação e arranjo com o Dicasdemat.",
    disciplineId: 120001,
    moduleId: 240004
  },
  {
    title: "Análise Combinatória - Aula 1",
    youtubeId: "aTzWz8ndpyk",
    duration: "25:00",
    description: "Primeira aula de análise combinatória.",
    disciplineId: 120001,
    moduleId: 240004
  },
  
  // Raciocínio Lógico Quantitativo (moduleId: 240005)
  {
    title: "5 Questões de Raciocínio Lógico - Nível 1",
    youtubeId: "_Xa7IhHwSxE",
    duration: "20:00",
    description: "Resolva 5 questões de raciocínio lógico com o Prof. Marcelo.",
    disciplineId: 120001,
    moduleId: 240005
  },
  {
    title: "Raciocínio Lógico para Concursos - Parte 1",
    youtubeId: "IOyR59NRb7M",
    duration: "30:00",
    description: "Aprenda raciocínio lógico para concursos com o Matemática Rio.",
    disciplineId: 120001,
    moduleId: 240005
  }
];

async function seedVideos() {
  console.log('🎬 Iniciando cadastro de vídeos...\n');
  
  let inserted = 0;
  let skipped = 0;
  
  for (const video of videos) {
    try {
      // Verificar se o vídeo já existe
      const [existing] = await connection.execute(
        'SELECT id FROM standalone_videos WHERE youtubeId = ?',
        [video.youtubeId]
      );
      
      if (existing.length > 0) {
        console.log(`⏭️  Vídeo já existe: ${video.title}`);
        skipped++;
        continue;
      }
      
      // Inserir vídeo
      await connection.execute(
        `INSERT INTO standalone_videos (title, youtubeId, duration, description, disciplineId, moduleId)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [video.title, video.youtubeId, video.duration, video.description, video.disciplineId, video.moduleId]
      );
      
      console.log(`✅ Inserido: ${video.title}`);
      inserted++;
    } catch (error) {
      console.error(`❌ Erro ao inserir ${video.title}:`, error.message);
    }
  }
  
  console.log(`\n📊 Resumo:`);
  console.log(`   Inseridos: ${inserted}`);
  console.log(`   Ignorados (já existiam): ${skipped}`);
  console.log(`   Total processados: ${videos.length}`);
  
  await connection.end();
}

seedVideos().catch(console.error);
