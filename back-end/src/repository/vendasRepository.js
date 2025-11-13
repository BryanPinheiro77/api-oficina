import { connection } from './connection.js';

export async function listarVendas() {
  const [rows] = await connection.query(`
    SELECT 
      v.*, 
      iv.qtd AS quantidade, 
      p.nome AS produto_nome
    FROM vendas v
    JOIN itens_venda iv ON iv.venda_id = v.id
    JOIN produtos p ON p.id = iv.produto_id
    ORDER BY v.criado_em DESC
  `);

  return rows;
}

export async function buscarPorId(id) {
  const [[venda]] = await connection.query(
    'SELECT * FROM vendas WHERE id=?',
    [id]
  );

  if (!venda) return null;

  const [itens] = await connection.query(`
    SELECT 
      iv.*, 
      p.nome
    FROM itens_venda iv
    JOIN produtos p ON p.id = iv.produto_id
    WHERE iv.venda_id=?
  `, [id]);

  venda.itens = itens;
  return venda;
}

export async function criarVenda(cliente_id, formaPagamento, itens) {
  // versão SEM transação
  let total = 0;

  for (const it of itens)
    total += it.preco_unit * it.qtd;

  const [res] = await connection.query(
    'INSERT INTO vendas (cliente_id, total, forma_pagamento) VALUES (?, ?, ?)',
    [cliente_id || null, total, formaPagamento]
  );

  const vendaId = res.insertId;

  for (const it of itens) {
    await connection.query(
      'INSERT INTO itens_venda (venda_id, produto_id, qtd, preco_unit) VALUES (?, ?, ?, ?)',
      [vendaId, it.produto_id, it.qtd, it.preco_unit]
    );

    await connection.query(
      'UPDATE produtos SET estoque = estoque - ? WHERE id=?',
      [it.qtd, it.produto_id]
    );
  }

  return vendaId;
}

export async function deletarVenda(id) {
  const [itens] = await connection.query(
    'SELECT * FROM itens_venda WHERE venda_id=?',
    [id]
  );

  if (itens.length > 0) {
    for (const it of itens) {
      await connection.query(
        'UPDATE produtos SET estoque = estoque + ? WHERE id=?',
        [it.qtd, it.produto_id]
      );
    }

    await connection.query(
      'DELETE FROM itens_venda WHERE venda_id=?',
      [id]
    );
  }

  const [info] = await connection.query(
    'DELETE FROM vendas WHERE id=?',
    [id]
  );

  return info.affectedRows;
}

export async function dashboardResumo() {
  const [[cards]] = await connection.query(`
    SELECT
      COALESCE(SUM(CASE WHEN DATE(criado_em) = CURDATE() THEN total ELSE 0 END), 0) AS faturamentoHoje,
      COALESCE(SUM(CASE WHEN YEARWEEK(criado_em, 1) = YEARWEEK(CURDATE(), 1) THEN total ELSE 0 END), 0) AS faturamentoSemana,
      COALESCE(SUM(CASE WHEN YEAR(criado_em) = YEAR(CURDATE()) AND MONTH(criado_em) = MONTH(CURDATE()) THEN total ELSE 0 END), 0) AS faturamentoMes,

      COALESCE(SUM(CASE WHEN DATE(criado_em) = CURDATE() THEN 1 ELSE 0 END), 0) AS vendasHoje,
      COALESCE(SUM(CASE WHEN YEARWEEK(criado_em, 1) = YEARWEEK(CURDATE(), 1) THEN 1 ELSE 0 END), 0) AS vendasSemana,
      COALESCE(SUM(CASE WHEN YEAR(criado_em) = YEAR(CURDATE()) AND MONTH(criado_em) = MONTH(CURDATE()) THEN 1 ELSE 0 END), 0) AS vendasMes
    FROM vendas;
  `);

  const [serie] = await connection.query(`
    SELECT DATE(criado_em) AS dia, SUM(total) AS total
    FROM vendas
    WHERE YEAR(criado_em) = YEAR(CURDATE())
      AND MONTH(criado_em) = MONTH(CURDATE())
    GROUP BY DATE(criado_em)
    ORDER BY dia;
  `);

  return { cards, serie };
}
