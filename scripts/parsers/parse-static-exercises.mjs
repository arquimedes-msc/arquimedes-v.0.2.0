/**
 * Parser para exercícios estáticos do arquivo ALGEBRA_EXERCISES_STATIC.md
 * 
 * Formato esperado:
 * **EX-ALG-M01-001**
 * **Pergunta:** ...
 * **Opções:**
 * 1. ...
 * 2. ... ✅
 * 3. ...
 * 4. ...
 * **Explicação:** ...
 * **Dica:** ...
 */

import fs from 'fs/promises';
import path from 'path';

export async function parseStaticExercises() {
  const filePath = path.join(process.cwd(), 'docs', 'ALGEBRA_EXERCISES_STATIC.md');
  const content = await fs.readFile(filePath, 'utf-8');
  
  const exercises = [];
  
  // Regex para capturar cada exercício
  const exerciseRegex = /\*\*EX-ALG-M(\d+)-(\d+)\*\*\n\*\*Pergunta:\*\* (.+?)\n\*\*Opções:\*\*\n1\. (.+?)\n2\. (.+?)\n3\. (.+?)\n4\. (.+?)\n\*\*Explicação:\*\* (.+?)\n\*\*Dica:\*\* (.+?)(?=\n\n---|\n\n\*\*EX-ALG|$)/gs;
  
  let match;
  while ((match = exerciseRegex.exec(content)) !== null) {
    const [
      ,
      moduleNum,
      exerciseNum,
      question,
      option1,
      option2,
      option3,
      option4,
      explanation,
      hint
    ] = match;
    
    // Identificar qual opção tem ✅
    const options = [option1, option2, option3, option4];
    const correctIndex = options.findIndex(opt => opt.includes('✅'));
    
    // Limpar ✅ das opções
    const cleanOptions = options.map(opt => opt.replace(' ✅', '').trim());
    
    // Determinar dificuldade baseado no número do exercício
    const moduleExercises = {
      1: { easy: 4, moderate: 4, difficult: 2 },
      2: { easy: 6, moderate: 6, difficult: 3 },
      3: { easy: 4, moderate: 4, difficult: 2 },
      4: { easy: 6, moderate: 6, difficult: 3 },
      5: { easy: 6, moderate: 6, difficult: 3 },
    };
    
    const moduleConfig = moduleExercises[parseInt(moduleNum)];
    const exNum = parseInt(exerciseNum);
    
    let difficulty, points;
    if (exNum <= moduleConfig.easy) {
      difficulty = 'easy';
      points = 5;
    } else if (exNum <= moduleConfig.easy + moduleConfig.moderate) {
      difficulty = 'moderate';
      points = 10;
    } else {
      difficulty = 'difficult';
      points = 15;
    }
    
    exercises.push({
      uniqueId: `EX-ALG-M${moduleNum.padStart(2, '0')}-${exerciseNum.padStart(3, '0')}`,
      title: question.substring(0, 100), // Primeiros 100 chars como título
      question: question.trim(),
      exerciseType: 'multiple_choice',
      options: JSON.stringify(cleanOptions),
      correctAnswer: correctIndex.toString(),
      stepByStepExplanation: explanation.trim(),
      hint: hint.trim(),
      difficulty,
      points,
      moduleIndex: parseInt(moduleNum),
    });
  }
  
  console.log(`✅ Parsed ${exercises.length} static exercises`);
  return exercises;
}
