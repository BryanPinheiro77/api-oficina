import { connection } from './connection.js';

export async function inserirUsuario(usuario) {
  const comando = `
    INSERT INTO usuarios (nome, email, senha_md5, role)
    VALUES (?, ?, MD5(?), ?);
  `;
  const [info] = await connection.query(comando, [
    usuario.nome,
    usuario.email,
    usuario.senha,
    usuario.role || 'user'
  ]);
  return info.insertId;
}

export async function listarUsuarios() {
  const comando = `
    SELECT id, nome, email, role
      FROM usuarios;
  `;
  const [registros] = await connection.query(comando);
  return registros;
}

export async function deletarUsuario(id) {
  const comando = `
    DELETE FROM usuarios
     WHERE id = ?;
  `;
  const [info] = await connection.query(comando, [id]);
  return info.affectedRows;
}
