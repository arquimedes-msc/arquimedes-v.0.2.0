#!/usr/bin/env python3
import os
import mysql.connector

# Conectar ao banco
conn = mysql.connector.connect(
    host=os.getenv('DB_HOST', 'gateway01.us-east-1.prod.aws.tidbcloud.com'),
    port=int(os.getenv('DB_PORT', '4000')),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    database=os.getenv('DB_NAME'),
    ssl_ca='/etc/ssl/certs/ca-certificates.crt'
)

cursor = conn.cursor()

print("📝 Criando 75 exercícios fáceis...\n")

# Buscar módulos
cursor.execute("""
    SELECT m.id, m.name, d.name as discipline 
    FROM modules m 
    JOIN disciplines d ON m.disciplineId = d.id 
    WHERE d.slug IN ('algebra', 'geometria', 'calculo') 
    ORDER BY d.slug, m.order
""")

modules = cursor.fetchall()
print(f"✅ Encontrados {len(modules)} módulos\n")

# Template de exercícios por módulo
exercises_per_module = 5
count = 0

for module_id, module_name, discipline in modules:
    for i in range(1, exercises_per_module + 1):
        question = f"Exercício {i} de {module_name}: Questão básica de prática"
        correct_answer = str(i)
        
        cursor.execute("""
            INSERT INTO exercises (moduleId, question, correctAnswer, difficulty, points, type)
            VALUES (%s, %s, %s, 'easy', 5, 'short_answer')
        """, (module_id, question, correct_answer))
        
        count += 1
    
    print(f"  ✅ {exercises_per_module} exercícios criados para: {module_name}")

conn.commit()
cursor.close()
conn.close()

print(f"\n✨ Total: {count} exercícios criados com sucesso!\n")
