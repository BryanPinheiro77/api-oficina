CREATE DATABASE oficina;
USE oficina;

-- Usuários (não usado nas vendas, mas pode manter)
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha_md5 VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user'
);

INSERT INTO usuarios (nome, email, senha_md5, role)
VALUES ('Admin', 'admin@oficina.com', MD5('123456'), 'admin');


-- Categorias dos produtos
CREATE TABLE categorias (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100)
);


-- Produtos
CREATE TABLE produtos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  preco DECIMAL(10,2),
  estoque INT DEFAULT 0,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);


-- Vendas (AGORA compatível com o backend)
CREATE TABLE vendas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT NULL,
  total DECIMAL(10,2),
  forma_pagamento VARCHAR(20) DEFAULT 'Dinheiro',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Itens da Venda (compatível com o backend)
CREATE TABLE itens_venda (
  id INT PRIMARY KEY AUTO_INCREMENT,
  venda_id INT,
  produto_id INT,
  qtd INT,
  preco_unit DECIMAL(10,2),
  FOREIGN KEY (venda_id) REFERENCES vendas(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
