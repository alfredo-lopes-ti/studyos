/* ==========================================================================
STUDYOS DATABASE - DATA POPULATION (SEEDS.SQL)
========================================================================== */

-- 1. Limpeza de dados de teste antigos (Boa prática para evitar conflito de chaves duplicadas)
TRUNCATE TABLE tarefas RESTART IDENTITY CASCADE;

-- 2. Inserção das missões diárias do Alfredo
INSERT INTO tarefas (codigo, nome, concluida) VALUES
                                                  ('java', '☕ Estudar Java (Interfaces & Exceptions)', false),
                                                  ('sql', '🗄️ Modelagem SQL & Banco de Dados', false),
                                                  ('csharp', '💙 Exercícios de Fixação C#', false),
                                                  ('english', '🇬🇧 Revisar Inglês Avançado', false);