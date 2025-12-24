#!/usr/bin/env python3
"""
Script para gerar exercícios fáceis estáticos para Arquimedes
Gera 90 exercícios: 10 adição, 20 subtração, 20 multiplicação, 20 divisão, 20 porcentagem
"""

import random
import json

def generate_addition_exercises(count=10):
    """Gera exercícios fáceis de adição"""
    exercises = []
    for i in range(count):
        a = random.randint(10, 99)
        b = random.randint(10, 99)
        answer = a + b
        
        # Gerar opções incorretas próximas
        options = [
            {"id": "a", "text": str(answer)},
            {"id": "b", "text": str(answer + random.randint(5, 15))},
            {"id": "c", "text": str(answer - random.randint(5, 15))},
            {"id": "d", "text": str(answer + random.randint(20, 30))}
        ]
        random.shuffle(options)
        
        exercises.append({
            "type": "multiple_choice",
            "question": f"Quanto é {a} + {b}?",
            "correctAnswer": "a",  # Será ajustado depois do shuffle
            "options": json.dumps(options),
            "difficulty": "easy",
            "points": 5,
            "moduleId": 1,  # Adição
            "explanation": f"Somando {a} + {b} = {answer}"
        })
    
    return exercises

def generate_subtraction_exercises(count=20):
    """Gera exercícios fáceis de subtração"""
    exercises = []
    contexts = [
        ("João tinha R$ {a} e gastou R$ {b}. Quanto sobrou?", "R$ {answer}"),
        ("Uma caixa tinha {a} laranjas. Foram vendidas {b}. Quantas restaram?", "{answer} laranjas"),
        ("Um ônibus tinha {a} passageiros. Desceram {b}. Quantos ficaram?", "{answer} passageiros"),
        ("Maria tinha {a} figurinhas e deu {b} para sua amiga. Quantas ficaram?", "{answer} figurinhas"),
        ("Calcule: {a} - {b}", "{answer}"),
    ]
    
    for i in range(count):
        a = random.randint(50, 200)
        b = random.randint(10, a - 10)
        answer = a - b
        
        context = random.choice(contexts)
        question = context[0].format(a=a, b=b)
        answer_format = context[1].format(answer=answer)
        
        # Gerar opções
        options = [
            {"id": "a", "text": answer_format},
            {"id": "b", "text": context[1].format(answer=answer + random.randint(5, 15))},
            {"id": "c", "text": context[1].format(answer=answer - random.randint(5, 15))},
            {"id": "d", "text": context[1].format(answer=answer + random.randint(20, 30))}
        ]
        random.shuffle(options)
        
        exercises.append({
            "type": "multiple_choice",
            "question": question,
            "correctAnswer": "a",
            "options": json.dumps(options),
            "difficulty": "easy",
            "points": 5,
            "moduleId": 90002,  # Subtração
            "explanation": f"Subtraindo {a} - {b} = {answer}"
        })
    
    return exercises

def generate_multiplication_exercises(count=20):
    """Gera exercícios fáceis de multiplicação"""
    exercises = []
    contexts = [
        ("Cada caixa tem {a} maçãs. Quantas maçãs há em {b} caixas?", "{answer} maçãs"),
        ("Um pacote custa R$ {a}. Quanto custam {b} pacotes?", "R$ {answer}"),
        ("Calcule: {a} × {b}", "{answer}"),
        ("Se cada pessoa recebe {a} balas, quantas balas são necessárias para {b} pessoas?", "{answer} balas"),
        ("Um livro tem {a} páginas. Quantas páginas têm {b} livros iguais?", "{answer} páginas"),
    ]
    
    for i in range(count):
        a = random.randint(5, 15)
        b = random.randint(5, 15)
        answer = a * b
        
        context = random.choice(contexts)
        question = context[0].format(a=a, b=b)
        answer_format = context[1].format(answer=answer)
        
        # Gerar opções
        options = [
            {"id": "a", "text": answer_format},
            {"id": "b", "text": context[1].format(answer=answer + random.randint(5, 15))},
            {"id": "c", "text": context[1].format(answer=answer - random.randint(5, 15))},
            {"id": "d", "text": context[1].format(answer=answer + random.randint(20, 30))}
        ]
        random.shuffle(options)
        
        exercises.append({
            "type": "multiple_choice",
            "question": question,
            "correctAnswer": "a",
            "options": json.dumps(options),
            "difficulty": "easy",
            "points": 5,
            "moduleId": 2,  # Multiplicação
            "explanation": f"Multiplicando {a} × {b} = {answer}"
        })
    
    return exercises

def generate_division_exercises(count=20):
    """Gera exercícios fáceis de divisão"""
    exercises = []
    contexts = [
        ("Divida {dividend} por {divisor}:", "{answer}"),
        ("{dividend} balas serão divididas igualmente entre {divisor} crianças. Quantas balas cada uma receberá?", "{answer} balas"),
        ("R$ {dividend} serão divididos entre {divisor} pessoas. Quanto cada uma receberá?", "R$ {answer}"),
        ("Um pacote com {dividend} biscoitos será dividido em {divisor} partes iguais. Quantos biscoitos em cada parte?", "{answer} biscoitos"),
        ("Calcule: {dividend} ÷ {divisor}", "{answer}"),
    ]
    
    for i in range(count):
        divisor = random.randint(5, 12)
        answer = random.randint(5, 20)
        dividend = divisor * answer
        
        context = random.choice(contexts)
        question = context[0].format(dividend=dividend, divisor=divisor)
        answer_format = context[1].format(answer=answer)
        
        # Gerar opções
        options = [
            {"id": "a", "text": answer_format},
            {"id": "b", "text": context[1].format(answer=answer + random.randint(2, 5))},
            {"id": "c", "text": context[1].format(answer=answer - random.randint(2, 5))},
            {"id": "d", "text": context[1].format(answer=answer + random.randint(6, 10))}
        ]
        random.shuffle(options)
        
        exercises.append({
            "type": "multiple_choice",
            "question": question,
            "correctAnswer": "a",
            "options": json.dumps(options),
            "difficulty": "easy",
            "points": 5,
            "moduleId": 3,  # Divisão
            "explanation": f"Dividindo {dividend} ÷ {divisor} = {answer}"
        })
    
    return exercises

def generate_percentage_exercises(count=20):
    """Gera exercícios fáceis de porcentagem"""
    exercises = []
    contexts = [
        ("Quanto é {percent}% de {value}?", "{answer}"),
        ("Um produto custa R$ {value}. Com {percent}% de desconto, quanto você economiza?", "R$ {answer}"),
        ("De {value} alunos, {percent}% são meninas. Quantas meninas?", "{answer} meninas"),
        ("Calcule {percent}% de {value}:", "{answer}"),
        ("Uma loja oferece {percent}% de desconto em um item de R$ {value}. Qual o valor do desconto?", "R$ {answer}"),
    ]
    
    for i in range(count):
        percent = random.choice([10, 20, 25, 50, 75])
        value = random.choice([100, 200, 300, 400, 500, 600, 800, 1000])
        answer = int(value * percent / 100)
        
        context = random.choice(contexts)
        question = context[0].format(percent=percent, value=value)
        answer_format = context[1].format(answer=answer)
        
        # Gerar opções
        options = [
            {"id": "a", "text": answer_format},
            {"id": "b", "text": context[1].format(answer=answer + random.randint(10, 50))},
            {"id": "c", "text": context[1].format(answer=answer - random.randint(10, 50))},
            {"id": "d", "text": context[1].format(answer=answer + random.randint(60, 100))}
        ]
        random.shuffle(options)
        
        exercises.append({
            "type": "multiple_choice",
            "question": question,
            "correctAnswer": "a",
            "options": json.dumps(options),
            "difficulty": "easy",
            "points": 5,
            "moduleId": 120006,  # Porcentagem
            "explanation": f"{percent}% de {value} = {answer}"
        })
    
    return exercises

def generate_sql_insert(exercises):
    """Gera SQL INSERT para os exercícios"""
    sql_parts = []
    
    for ex in exercises:
        # Escapar aspas simples no JSON
        options_escaped = ex['options'].replace("'", "\\'")  
        question_escaped = ex['question'].replace("'", "\\'") 
        explanation_escaped = ex['explanation'].replace("'", "\\'") 
        
        sql_parts.append(
            f"('EX-{ex['moduleId']}-{len(sql_parts)+1:03d}', 'Exercício {len(sql_parts)+1}', '{question_escaped}', "
            f"'{ex['type']}', '{options_escaped}', '{ex['correctAnswer']}', "
            f"'{explanation_escaped}', NULL, '{ex['difficulty']}', {ex['points']}, NULL, {ex['moduleId']})"
        )
    
    sql = "INSERT INTO standalone_exercises (uniqueId, title, question, exerciseType, options, correctAnswer, stepByStepExplanation, hint, difficulty, points, disciplineId, moduleId) VALUES\n"
    sql += ",\n".join(sql_parts) + ";"
    
    return sql

if __name__ == "__main__":
    print("🎯 Gerando exercícios fáceis...")
    
    all_exercises = []
    
    print("➕ Adição: 10 exercícios")
    all_exercises.extend(generate_addition_exercises(10))
    
    print("➖ Subtração: 20 exercícios")
    all_exercises.extend(generate_subtraction_exercises(20))
    
    print("✖️  Multiplicação: 20 exercícios")
    all_exercises.extend(generate_multiplication_exercises(20))
    
    print("➗ Divisão: 20 exercícios")
    all_exercises.extend(generate_division_exercises(20))
    
    print("💯 Porcentagem: 20 exercícios")
    all_exercises.extend(generate_percentage_exercises(20))
    
    print(f"\n✅ Total: {len(all_exercises)} exercícios gerados")
    
    # Gerar SQL
    sql = generate_sql_insert(all_exercises)
    
    # Salvar em arquivo
    with open("/home/ubuntu/arquimedes/insert_exercises.sql", "w", encoding="utf-8") as f:
        f.write(sql)
    
    print("📝 SQL salvo em: /home/ubuntu/arquimedes/insert_exercises.sql")
    print("\n🚀 Execute o SQL no banco de dados para inserir os exercícios!")
