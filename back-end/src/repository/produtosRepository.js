import { connection } from './connection.js';

export async function inserirProduto(produto) {
  const comando = `
    INSERT INTO produtos (nome, preco, estoque, categoria)
         VALUES (?, ?, ?, ?);
  `;
  const [info] = await connection.query(comando, [
    produto.nome,
    produto.preco,
    produto.estoque,
    produto.categoria
  ]);
  return info.insertId;
}

export async function listarProdutos() {
  const comando = `
    SELECT id, nome, preco, estoque, categoria
      FROM produtos;
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
           categoria = ?
     WHERE id = ?;
  `;
  const [info] = await connection.query(comando, [
    produto.nome,
    produto.preco,
    produto.estoque,
    produto.categoria,
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
    SELECT id, nome, preco, estoque, categoria
      FROM produtos
     WHERE id = ?;
  `;
  const [registros] = await connection.query(comando, [id]);
  return registros[0];
}

export async function filtrarPorNome(nome) {
  const comando = `
    SELECT id, nome, preco, estoque, categoria
      FROM produtos
     WHERE nome LIKE ?;
  `;
  const [registros] = await connection.query(comando, ['%' + nome + '%']);
  return registros;
}
