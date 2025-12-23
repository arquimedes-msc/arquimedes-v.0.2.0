import { drizzle } from "drizzle-orm/mysql2";
import { standaloneVideos } from "./drizzle/schema";

const db = drizzle(process.env.DATABASE_URL);

// Vídeos reais do YouTube sobre matemática, vinculados aos módulos
const videos = [
  // Módulo 1: Adição e Subtração (ID: 1)
  {
    title: "Adição e Subtração - Aula Completa",
    youtubeId: "dQw4w9WgXcQ", // Placeholder - substitua por ID real
    duration: "15:30",
    description: "Aprenda adição e subtração de forma simples e prática com exemplos do dia a dia.",
    moduleId: 1,
    disciplineId: 1,
  },
  {
    title: "Propriedades da Adição",
    youtubeId: "dQw4w9WgXcQ",
    duration: "10:45",
    description: "Entenda as propriedades comutativa, associativa e elemento neutro da adição.",
    moduleId: 1,
    disciplineId: 1,
  },
  {
    title: "Subtração com Reagrupamento",
    youtubeId: "dQw4w9WgXcQ",
    duration: "12:20",
    description: "Domine a técnica de subtração com reagrupamento (empréstimo).",
    moduleId: 1,
    disciplineId: 1,
  },

  // Módulo 2: Multiplicação (ID: 2)
  {
    title: "Multiplicação - Conceitos Básicos",
    youtubeId: "dQw4w9WgXcQ",
    duration: "14:15",
    description: "Introdução à multiplicação: conceito, tabuada e aplicações práticas.",
    moduleId: 2,
    disciplineId: 1,
  },
  {
    title: "Tabuada de Multiplicação Completa",
    youtubeId: "dQw4w9WgXcQ",
    duration: "18:30",
    description: "Aprenda todas as tabuadas de 1 a 10 com técnicas de memorização.",
    moduleId: 2,
    disciplineId: 1,
  },
  {
    title: "Propriedades da Multiplicação",
    youtubeId: "dQw4w9WgXcQ",
    duration: "11:50",
    description: "Propriedades comutativa, associativa, distributiva e elemento neutro.",
    moduleId: 2,
    disciplineId: 1,
  },

  // Módulo 3: Divisão (ID: 3)
  {
    title: "Divisão - Aula Completa para Iniciantes",
    youtubeId: "dQw4w9WgXcQ",
    duration: "16:40",
    description: "Aprenda divisão do zero: conceito, algoritmo e aplicações.",
    moduleId: 3,
    disciplineId: 1,
  },
  {
    title: "Divisão Exata e Divisão com Resto",
    youtubeId: "dQw4w9WgXcQ",
    duration: "13:25",
    description: "Entenda a diferença entre divisão exata e divisão com resto.",
    moduleId: 3,
    disciplineId: 1,
  },
  {
    title: "Divisão por Dois Algarismos",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15:10",
    description: "Técnica passo a passo para divisão por números de dois algarismos.",
    moduleId: 3,
    disciplineId: 1,
  },

  // Módulo 60001: Frações (ID: 60001)
  {
    title: "Frações - Introdução Completa",
    youtubeId: "dQw4w9WgXcQ",
    duration: "17:20",
    description: "O que são frações? Numerador, denominador e representação visual.",
    moduleId: 60001,
    disciplineId: 1,
  },
  {
    title: "Operações com Frações",
    youtubeId: "dQw4w9WgXcQ",
    duration: "20:15",
    description: "Adição, subtração, multiplicação e divisão de frações.",
    moduleId: 60001,
    disciplineId: 1,
  },

  // Módulo 60002: Decimais (ID: 60002)
  {
    title: "Números Decimais - Aula Completa",
    youtubeId: "dQw4w9WgXcQ",
    duration: "14:30",
    description: "Entenda números decimais, leitura e escrita.",
    moduleId: 60002,
    disciplineId: 1,
  },
  {
    title: "Operações com Decimais",
    youtubeId: "dQw4w9WgXcQ",
    duration: "16:45",
    description: "Como somar, subtrair, multiplicar e dividir números decimais.",
    moduleId: 60002,
    disciplineId: 1,
  },

  // Módulo 60003: Porcentagem (ID: 60003)
  {
    title: "Porcentagem - Conceitos e Cálculos",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15:20",
    description: "O que é porcentagem e como calcular percentuais.",
    moduleId: 60003,
    disciplineId: 1,
  },
  {
    title: "Porcentagem no Dia a Dia",
    youtubeId: "dQw4w9WgXcQ",
    duration: "12:40",
    description: "Aplicações práticas: descontos, juros e aumentos.",
    moduleId: 60003,
    disciplineId: 1,
  },
];

console.log("Inserindo vídeos no banco de dados...");

for (const video of videos) {
  await db.insert(standaloneVideos).values(video);
  console.log(`✓ Vídeo inserido: ${video.title} (Módulo ${video.moduleId})`);
}

console.log(`\n✅ ${videos.length} vídeos inseridos com sucesso!`);
console.log("\n⚠️  IMPORTANTE: Os IDs do YouTube são placeholders (dQw4w9WgXcQ).");
console.log("Substitua por IDs reais de vídeos educacionais do YouTube.");
