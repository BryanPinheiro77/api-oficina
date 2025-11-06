import { connection } from './connection.js';

export async function inserirProduto(produto) {
  let comando;
  let params;

  // Se tiver categoria_id, inclui no insert
  if (produto.categoria_id)
    comando = `
      INSERT INTO produtos (nome, preco, estoque, categoria_id)
      VALUES (?, ?, ?, ?)
    `,
    params = [produto.nome, produto.preco, produto.estoque, produto.categoria_id];
  else
    comando = `
      INSERT INTO produtos (nome, preco, estoque)
      VALUES (?, ?, ?)
    `,
    params = [produto.nome, produto.preco, produto.estoque];

  const [info] = await connection.query(comando, params);
  return info.insertId;
}

export async function listarProdutos() {
  const comando = `
    SELECT p.id,
           p.nome,
           p.preco,
           p.estoque,
           c.nome AS categoria_nome
      FROM produtos p
 LEFT JOIN categorias c ON p.categoria_id = c.id;
  `;
  const [registros] = await connection.query(comando);
  return registros;
}

export async function alterarProduto(id, produto) {
  const comando = `
    UPDATE produtos
       SET nome = ?,
           preco = ?,
           estoque = ?,
           categoria_id = ?
     WHERE id = ?;
  `;
  const [info] = await connection.query(comando, [
    produto.nome,
    produto.preco,
    produto.estoque,
    produto.categoria_id || null,
    id
  ]);
  return info.affectedRows;
}

export async function deletarProduto(id) {
  const comando = `DELETE FROM produtos WHERE id = ?;`;
  const [info] = await connection.query(comando, [id]);
  return info.affectedRows;
}

export async function buscarPorId(id) {
  const comando = `
    SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria_nome
      FROM produtos p
 LEFT JOIN categorias c ON p.categoria_id = c.id
     WHERE p.id = ?;
  `;
  const [registros] = await connection.query(comando, [id]);
  return registros[0];
}

export async function filtrarPorNome(nome) {
  const comando = `
    SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria_nome
      FROM produtos p
 LEFT JOIN categorias c ON p.categoria_id = c.id
     WHERE p.nome LIKE ?;
  `;
  const [registros] = await connection.query(comando, ['%' + nome + '%']);
  return registros;
}
