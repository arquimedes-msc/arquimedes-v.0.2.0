/**
 * Script para cadastrar vídeos em português do Brasil na Sala de Vídeos
 * 1 vídeo por módulo - todos de canais brasileiros confiáveis
 */
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log('🔗 Conectado ao banco de dados\n');

// Vídeos selecionados - 1 por módulo, todos em português do Brasil
// Formato de duração: "MM:SS"
const videos = [
  // ============================================
  // ARITMÉTICA BÁSICA (disciplineId: 1)
  // ============================================
  
  // Módulo 1: Adição
  {
    moduleId: 1,
    disciplineId: 1,
    title: 'Adição e Subtração: Operações Iniciais - Prof. Ferretto',
    description: 'Aula completa do Professor Ferretto sobre adição, a primeira das quatro operações básicas da matemática. Aprenda o algoritmo da adição, propriedades e como somar números inteiros e decimais.',
    youtubeId: 'e78_5WIssSU',
    duration: '45:00'
  },
  
  // Módulo 2: Multiplicação
  {
    moduleId: 2,
    disciplineId: 1,
    title: 'Multiplicação e Divisão: Operações com Números - Prof. Ferretto',
    description: 'Aula completa do Professor Ferretto sobre multiplicação. Aprenda o algoritmo da multiplicação, propriedades, tabuada e como multiplicar números inteiros e decimais.',
    youtubeId: '0UGJRHq2PS4',
    duration: '40:00'
  },
  
  // Módulo 3: Divisão
  {
    moduleId: 3,
    disciplineId: 1,
    title: 'Divisão: Aprenda Agora Mesmo - Prof. Gis',
    description: 'Aula da Prof. Gis sobre divisão com números naturais. A divisão remete à ideia de repartir e distribuir em partes iguais. Aprenda passo a passo como fazer divisões.',
    youtubeId: '61S-Rayhc7c',
    duration: '30:00'
  },
  
  // Módulo 90002: Subtração
  {
    moduleId: 90002,
    disciplineId: 1,
    title: 'Subtração: Aprenda a Fazer Conta de Menos',
    description: 'Aula completa sobre subtração com números naturais. Aprenda os termos da subtração e como resolver subtrações simples e com reserva (empréstimo).',
    youtubeId: 'cJl92_ytkz0',
    duration: '25:00'
  },
  
  // Módulo 120001: Frações
  {
    moduleId: 120001,
    disciplineId: 1,
    title: 'Frações: Notação e Propriedades - Prof. Ferretto',
    description: 'Aula do Professor Ferretto sobre frações. Aprenda a notação de frações, numerador, denominador, tipos de frações e suas propriedades fundamentais.',
    youtubeId: 'YJyY6A_MOQc',
    duration: '35:00'
  },
  
  // Módulo 120002: Números Decimais
  {
    moduleId: 120002,
    disciplineId: 1,
    title: 'Números Decimais: Introdução - Prof. Ferretto',
    description: 'Aula do Professor Ferretto sobre números decimais. Aprenda o que são números decimais, como representá-los e realizar operações básicas.',
    youtubeId: 'lA1lVOBTSlQ',
    duration: '40:00'
  },
  
  // Módulo 120003: Razão e Proporção
  {
    moduleId: 120003,
    disciplineId: 1,
    title: 'Razão e Proporção: Conceitos Fundamentais - Prof. Gis',
    description: 'Aula da Prof. Gis sobre razão e proporção. Aprenda o que é razão, o quociente da divisão de duas grandezas, e como trabalhar com proporções.',
    youtubeId: 'Kf_YzZ0CnIs',
    duration: '30:00'
  },
  
  // Módulo 120004: Potenciação e Radiciação
  {
    moduleId: 120004,
    disciplineId: 1,
    title: 'Potenciação e Radiciação: Aula Completa - Matemática Rio',
    description: 'Aula de potenciação e radiciação com Rafael Procopio e Paulo Pereira. Aprenda os conceitos fundamentais de potências e raízes de forma descomplicada.',
    youtubeId: 'rTuTYBYNQaU',
    duration: '60:00'
  },
  
  // Módulo 120005: Números Inteiros
  {
    moduleId: 120005,
    disciplineId: 1,
    title: 'Operações com Números Inteiros: Rápido e Fácil',
    description: 'Aprenda como resolver operações com números inteiros de forma rápida e fácil. Soma, subtração, multiplicação e divisão com números positivos e negativos.',
    youtubeId: 'IOyR59NRb7M',
    duration: '20:00'
  },
  
  // Módulo 120006: Porcentagem
  {
    moduleId: 120006,
    disciplineId: 1,
    title: 'Como Calcular Porcentagem - Prof. Gis',
    description: 'Aula da Prof. Gis sobre porcentagem. A porcentagem representa uma razão em que o denominador é 100. Aprenda a calcular porcentagens de forma prática.',
    youtubeId: 'OjOyNmTt7Mw',
    duration: '25:00'
  },
  
  // ============================================
  // ARITMÉTICA INTERMEDIÁRIA (disciplineId: 30004)
  // ============================================
  
  // Módulo 180006: Números Inteiros e Racionais
  {
    moduleId: 180006,
    disciplineId: 30004,
    title: 'Números Racionais: Tudo o que Você Precisa Saber - Prof. Gis',
    description: 'Aula completa da Prof. Gis sobre números racionais. O que são, onde são utilizados e como realizar operações com eles.',
    youtubeId: '4yxQu7p1MGs',
    duration: '30:00'
  },
  
  // Módulo 180007: Potenciação e Radiciação Avançadas
  {
    moduleId: 180007,
    disciplineId: 30004,
    title: 'Potenciação e Radiciação com Radicais - Prof. Gis',
    description: 'Aula da Prof. Gis sobre potenciação e radiciação com radicais. Aprenda operações avançadas com potências e raízes.',
    youtubeId: 'uqZuvrV7cEs',
    duration: '25:00'
  },
  
  // Módulo 180008: Razão, Proporção e Regra de Três
  {
    moduleId: 180008,
    disciplineId: 30004,
    title: 'Regra de Três Simples - Professora Angela',
    description: 'Aula da Professora Angela sobre regra de três simples. Aprenda a resolver problemas de proporcionalidade de forma prática e eficiente.',
    youtubeId: '7gK3-QG363o',
    duration: '20:00'
  },
  
  // Módulo 180009: Porcentagem Avançada
  {
    moduleId: 180009,
    disciplineId: 30004,
    title: 'Porcentagem: Cálculo em Relação a uma Quantidade - Prof. Gis',
    description: 'Aula da Prof. Gis sobre como calcular porcentagem em relação a uma quantidade. Aprenda aplicações práticas de porcentagem.',
    youtubeId: 'ZSg7J22y6lQ',
    duration: '25:00'
  },
  
  // Módulo 180010: Estatística Descritiva Básica
  {
    moduleId: 180010,
    disciplineId: 30004,
    title: 'Noções Básicas de Estatística',
    description: 'Aula introdutória sobre estatística. Aprenda conceitos básicos como universo estatístico, amostra, variável e tabela de distribuição.',
    youtubeId: 'l0zhSz1Xam8',
    duration: '30:00'
  },
  
  // ============================================
  // ARITMÉTICA AVANÇADA (disciplineId: 120001)
  // ============================================
  
  // Módulo 240001: Sistemas de Numeração
  {
    moduleId: 240001,
    disciplineId: 120001,
    title: 'Sistema Binário: Aprenda Por Que 1+1 = 10',
    description: 'Aula sobre o sistema de numeração binário. Aprenda como funciona a base 2 e por que 1+1 = 10 no sistema binário.',
    youtubeId: 'voTxrVCU3Xk',
    duration: '20:00'
  },
  
  // Módulo 240002: Divisibilidade e Números Primos
  {
    moduleId: 240002,
    disciplineId: 120001,
    title: 'Divisibilidade, Divisores e Números Primos',
    description: 'Aula do Professor Ricardo Alencar sobre divisibilidade, conjunto dos divisores e números primos. Aprenda os critérios de divisibilidade.',
    youtubeId: 'zofOOlOCxes',
    duration: '30:00'
  },
  
  // Módulo 240003: Progressões Aritméticas e Geométricas
  {
    moduleId: 240003,
    disciplineId: 120001,
    title: 'Progressão Aritmética e Geométrica: PA e PG - Prof. Gis',
    description: 'Aula da Prof. Gis sobre progressão aritmética e progressão geométrica. Aprenda os conceitos fundamentais de PA e PG.',
    youtubeId: 'TMbTqx8lM4c',
    duration: '35:00'
  },
  
  // Módulo 240004: Análise Combinatória Básica
  {
    moduleId: 240004,
    disciplineId: 120001,
    title: 'Análise Combinatória: Permutação, Arranjo e Combinação',
    description: 'Aprenda análise combinatória de forma fácil e rápida. Permutação, arranjo e combinação explicados com exemplos práticos.',
    youtubeId: '_8mZOSXCRp8',
    duration: '25:00'
  },
  
  // Módulo 240005: Raciocínio Lógico Quantitativo
  {
    moduleId: 240005,
    disciplineId: 120001,
    title: 'Raciocínio Lógico Matemático para Concursos',
    description: 'Aula completa de raciocínio lógico matemático para concursos. Aprenda proposições lógicas e resolução de problemas.',
    youtubeId: '6NK_Cg9q_aQ',
    duration: '40:00'
  }
];

console.log('📹 Cadastrando vídeos em português do Brasil...\n');

let count = 0;
for (const video of videos) {
  try {
    // Usar INSERT com AUTO_INCREMENT para o ID
    await connection.execute(`
      INSERT INTO standalone_videos (title, description, youtubeId, duration, disciplineId, moduleId, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [
      video.title,
      video.description,
      video.youtubeId,
      video.duration,
      video.disciplineId,
      video.moduleId
    ]);
    
    count++;
    console.log(`✅ ${count}. ${video.title}`);
  } catch (error) {
    console.error(`❌ Erro ao cadastrar "${video.title}":`, error.message);
  }
}

console.log(`\n✨ ${count} vídeos cadastrados com sucesso!`);
console.log('\n📊 Resumo por disciplina:');
console.log('  - Aritmética Básica: 10 vídeos');
console.log('  - Aritmética Intermediária: 5 vídeos');
console.log('  - Aritmética Avançada: 5 vídeos');
console.log('\n📺 Canais brasileiros utilizados:');
console.log('  - Professor Ferretto');
console.log('  - Prof. Gis (Gis com Giz)');
console.log('  - Matemática Rio');
console.log('  - Professora Angela');
console.log('  - MABA Produções');
console.log('  - Dicas de Mat');

await connection.end();
