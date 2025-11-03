import { connection } from './connection.js';

export async function autenticar(email, senha) {
  const comando = `
    SELECT id, nome, email, role
      FROM usuarios
     WHERE email = ?
       AND senha_md5 = MD5(?);
  `;
  const [registros] = await connection.query(comando, [email, senha]);
  return registros[0];
}
