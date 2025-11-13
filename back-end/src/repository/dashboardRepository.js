import { connection } from "./connection.js";

/* ============================================
   📦 TOTAL DE ITENS E VALOR EM ESTOQUE
============================================ */
export async function getOverview() {
  const [rows] = await connection.query(`
    SELECT 
      COUNT(*) AS totalItens,
      COALESCE(SUM(preco * estoque), 0) AS stockValue
    FROM produtos;
  `);
  return rows[0];
}

/* ============================================
   💰 RESUMO DE VENDAS (VALOR TOTAL + META)
============================================ */
export async function getSalesSummary() {
  const [rows] = await connection.query(`
    SELECT COALESCE(SUM(total), 0) AS sold
    FROM vendas;
  `);

  const target = 50000; // futura config
  return { sold: Number(rows[0].sold || 0), target };
}

/* ============================================
   ⚠️ PRODUTOS COM ESTOQUE BAIXO
============================================ */
export async function getLowStock() {
  const LIMITE_ESTOQUE_BAIXO = 10;

  const [rows] = await connection.query(
    `
    SELECT id, nome, estoque, preco
    FROM produtos
    WHERE estoque < ?;
  `,
    [LIMITE_ESTOQUE_BAIXO]
  );

  return rows.map((p) => ({
    ...p,
    preco: Number(p.preco || 0),
    estoque: Number(p.estoque || 0),
  }));
}

/* ============================================
   🟣 NOVO: VENDAS POR PERÍODO
   (dia, semana, mes, ano, custom)
============================================ */
export async function getSalesByPeriod(period, start, end) {
  let where = "";
  const params = [];

  switch (period) {
    case "dia":
      where = "DATE(criado_em) = CURDATE()";
      break;

    case "semana":
      where = "YEARWEEK(criado_em, 1) = YEARWEEK(CURDATE(), 1)";
      break;

    case "mes":
      where =
        "YEAR(criado_em) = YEAR(CURDATE()) AND MONTH(criado_em) = MONTH(CURDATE())";
      break;

    case "ano":
      where = "YEAR(criado_em) = YEAR(CURDATE())";
      break;

    case "custom":
      where = "DATE(criado_em) BETWEEN ? AND ?";
      params.push(start, end);
      break;

    default:
      where = "criado_em >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)";
      break;
  }

  // TOTAL E QUANTIDADE
  const [[totais]] = await connection.query(
    `
      SELECT 
        COALESCE(SUM(total), 0) AS total,
        COUNT(*) AS quantidade
      FROM vendas
      WHERE ${where};
    `,
    params
  );

  // SÉRIE DIÁRIA PARA GRÁFICO
  const [series] = await connection.query(
    `
      SELECT 
        DATE(criado_em) AS dia,
        SUM(total) AS total
      FROM vendas
      WHERE ${where}
      GROUP BY DATE(criado_em)
      ORDER BY dia ASC;
    `,
    params
  );

  return {
    total: Number(totais.total || 0),
    quantidade: Number(totais.quantidade || 0),
    series: series.map((s) => ({
      dia: s.dia,
      total: Number(s.total || 0),
    })),
  };
}
