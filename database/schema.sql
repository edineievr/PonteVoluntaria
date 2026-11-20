-- Ponte Voluntária · schema.sql
-- Recria o banco do zero. Atenção: apaga os dados que já existirem.

SET NAMES utf8mb4;
DROP DATABASE IF EXISTS pontevoluntaria;
CREATE DATABASE pontevoluntaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pontevoluntaria;

CREATE TABLE voluntario (
  id_voluntario INT AUTO_INCREMENT PRIMARY KEY,
  nome          VARCHAR(150) NOT NULL,
  email         VARCHAR(100) NOT NULL UNIQUE,
  telefone      VARCHAR(20),
  data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projeto (
  id_projeto INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL UNIQUE,
  ong        VARCHAR(150) NOT NULL
);

CREATE TABLE atividade (
  id_atividade INT AUTO_INCREMENT PRIMARY KEY,
  id_projeto   INT NOT NULL,
  nome         VARCHAR(150) NOT NULL,
  descricao    VARCHAR(255),
  UNIQUE (id_projeto, nome),
  FOREIGN KEY (id_projeto) REFERENCES projeto (id_projeto)
);

CREATE TABLE inscricao (
  id_inscricao  INT AUTO_INCREMENT PRIMARY KEY,
  id_voluntario INT NOT NULL,
  data_inicio   DATE NOT NULL,
  observacao    VARCHAR(255),
  criado_em     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_voluntario) REFERENCES voluntario (id_voluntario)
);

CREATE TABLE inscricao_atividade (
  id_inscricao   INT NOT NULL,
  id_atividade   INT NOT NULL,
  horas_semanais INT NOT NULL CHECK (horas_semanais BETWEEN 1 AND 40),
  PRIMARY KEY (id_inscricao, id_atividade),
  FOREIGN KEY (id_inscricao) REFERENCES inscricao (id_inscricao) ON DELETE CASCADE,
  FOREIGN KEY (id_atividade) REFERENCES atividade (id_atividade)
);
