import { connection } from './connection.js';

export async function listarVendas() {
  const [rows] = await connection.query('SELECT * FROM vendas ORDER BY criado_em DESC');
  return rows;
}

export async function buscarPorId(id) {
  const [[venda]] = await connection.query('SELECT * FROM vendas WHERE id=?', [id]);
  if (!venda) return null;

  const [itens] = await connection.query(
    'SELECT iv.*, p.nome FROM itens_venda iv JOIN produtos p ON p.id = iv.produto_id WHERE iv.venda_id=?',
    [id]
  );
  venda.itens = itens;
  return venda;
}

export async function criarVenda(cliente_id, itens) {
  const conn = await connection.getConnection();
  try {
    await conn.beginTransaction();
    let total = 0;

    for (const it of itens) total += it.preco_unit * it.qtd;

    const [res] = await conn.query(
      'INSERT INTO vendas (cliente_id, total) VALUES (?, ?)',
      [cliente_id || null, total]
    );

    const vendaId = res.insertId;

    for (const it of itens) {
      await conn.query(
        'INSERT INTO itens_venda (venda_id, produto_id, qtd, preco_unit) VALUES (?, ?, ?, ?)',
        [vendaId, it.produto_id, it.qtd, it.preco_unit]
      );
      await conn.query('UPDATE produtos SET estoque = estoque - ? WHERE id=?', [
        it.qtd,
        it.produto_id
      ]);
    }

    await conn.commit();
    return vendaId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function deletarVenda(id) {
  const conn = await connection.getConnection();
  try {
    await conn.beginTransaction();

    const [itens] = await conn.query('SELECT * FROM itens_venda WHERE venda_id=?', [id]);
    if (itens.length === 0) {
      const [info] = await conn.query('DELETE FROM vendas WHERE id=?', [id]);
      await conn.commit();
      return info.affectedRows;
    }

    // devolve estoque
    for (const it of itens) {
      await conn.query('UPDATE produtos SET estoque = estoque + ? WHERE id=?', [
        it.qtd,
        it.produto_id
      ]);
    }

    await conn.query('DELETE FROM itens_venda WHERE venda_id=?', [id]);
    const [info] = await conn.query('DELETE FROM vendas WHERE id=?', [id]);

    await conn.commit();
    return info.affectedRows;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
