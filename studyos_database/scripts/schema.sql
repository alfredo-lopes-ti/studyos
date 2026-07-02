/* ==========================================================================
   STUDYOS DATABASE - SCHEMA DEFINITION (SCHEMA.SQL)
   ========================================================================== */

   CREATE TABLE IF NOT EXIST tarefas (
       id SERIAL PRIMARY KEY,                    -- Código numérico sequencial automático
       codigo VARCHAR(50) NOT NULL UNIQUE,       -- ID de negócio (ex: 'java'), não pode repetir
       nome VARCHAR(255) NOT NULL,               -- Descrição da missão na tela
       concluida BOOLEAN DEFAULT FALSE           -- Estado inicial: toda tarefa nasce aberta
   )