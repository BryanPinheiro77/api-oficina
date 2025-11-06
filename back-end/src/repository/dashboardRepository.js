import { connection } from "./connection.js";

// 📦 Total de produtos e valor total em estoque
export async function getOverview() {
  const [rows] = await connection.query(`
    SELECT 
      COUNT(*) AS totalItens,
      COALESCE(SUM(preco * estoque), 0) AS stockValue
    FROM produtos;
  `);
  return rows[0];
}

// 💰 Resumo de vendas (valor total vendido e meta mensal)
export async function getSalesSummary() {
  // Pega o total vendido somando os campos da tabela vendas
  const [rows] = await connection.query(`
    SELECT COALESCE(SUM(total), 0) AS sold
    FROM vendas;
  `);

  // Define a meta manualmente (pode vir de tabela "configuracoes" futuramente)
  const target = 50000;
  return { sold: Number(rows[0].sold || 0), target };
}

// ⚠️ Produtos com estoque baixo
export async function getLowStock() {
  const LIMITE_ESTOQUE_BAIXO = 10; // 🔥 limite padrão
  const [rows] = await connection.query(
    `
    SELECT id, nome, estoque, preco
    FROM produtos
    WHERE estoque < ?;
  `,
    [LIMITE_ESTOQUE_BAIXO]
  );

  // Garante que valores sejam numéricos
  return rows.map((p) => ({
    ...p,
    preco: Number(p.preco || 0),
    estoque: Number(p.estoque || 0),
  }));
}
