import { connection } from './connection.js';

export async function inserirCategoria(nome) {
  const [info] = await connection.query(
    'INSERT INTO categorias (nome) VALUES (?)',
    [nome]
  );
  return info.insertId;
}

export async function listarCategorias() {
  const [registros] = await connection.query('SELECT * FROM categorias');
  return registros;
}

export async function alterarCategoria(id, nome) {
  const [info] = await connection.query(
    'UPDATE categorias SET nome=? WHERE id=?',
    [nome, id]
  );
  return info.affectedRows;
}

export async function deletarCategoria(id) {
  const [info] = await connection.query('DELETE FROM categorias WHERE id=?', [id]);
  return info.affectedRows;
}
