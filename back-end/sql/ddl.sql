CREATE DATABASE IF NOT EXISTS oficina;
USE oficina;

-- Usuários
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha_md5 VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user'
);

INSERT INTO usuarios (nome, email, senha_md5, role)
VALUES ('Admin', 'admin@oficina.com', MD5('123456'), 'admin');

-- Categorias
CREATE TABLE categorias (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100)
);

-- Produtos
CREATE TABLE produtos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  preco DECIMAL(10,2),
  estoque INT,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Vendas
CREATE TABLE vendas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT,
  total DECIMAL(10,2),
  criado_em DATETIME DEFAULT NOW(),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Itens da venda
CREATE TABLE itens_venda (
  id INT PRIMARY KEY AUTO_INCREMENT,
  venda_id INT,
  produto_id INT,
  quantidade INT,
  preco_unitario DECIMAL(10,2),
  FOREIGN KEY (venda_id) REFERENCES vendas(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);