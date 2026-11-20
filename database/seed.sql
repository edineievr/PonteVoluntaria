-- Ponte Voluntária · seed.sql
-- Dados de exemplo. Rode depois do schema.sql.

SET NAMES utf8mb4;
USE pontevoluntaria;

INSERT INTO projeto (nome, ong) VALUES
  ('Casa de Apoio GACCH', 'GACCH – Grupo de Apoio às Crianças com Câncer e Hemopatias');

INSERT INTO atividade (id_projeto, nome, descricao) VALUES
  (1, 'Recreação com as crianças', 'Brincadeiras e contação de histórias'),
  (1, 'Apoio na cozinha', 'Preparo das refeições da casa de apoio'),
  (1, 'Bazar beneficente', 'Organização e venda de peças doadas'),
  (1, 'Motorista voluntário', 'Levar famílias às consultas'),
  (1, 'Eventos e campanhas', 'Apoio em ações como o McDia Feliz'),
  (1, 'Oficina de artesanato', 'Atividades manuais com mães e crianças');

INSERT INTO voluntario (nome, email, telefone) VALUES
  ('Ana Souza', 'ana.souza@exemplo.com', '(14) 98888-1001'),
  ('Bruno Lima', 'bruno.lima@exemplo.com', NULL),
  ('Carla Mendes', 'carla.mendes@exemplo.com', '(14) 97777-1002'),
  ('Diego Rocha', 'diego.rocha@exemplo.com', '(14) 96666-1003');

INSERT INTO inscricao (id_voluntario, data_inicio, observacao) VALUES
  (1, '2026-11-28', 'Disponível aos sábados'),
  (3, '2026-12-01', NULL),
  (2, '2026-12-05', 'Prefere o período da noite');

INSERT INTO inscricao_atividade (id_inscricao, id_atividade, horas_semanais) VALUES
  (1, 1, 4),
  (1, 5, 2),
  (2, 2, 6),
  (2, 3, 3),
  (3, 4, 4),
  (3, 6, 2);
