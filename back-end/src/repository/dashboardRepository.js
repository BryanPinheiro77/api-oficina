import { connection } from './connection.js';

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

  // Define a meta manualmente (ou futuramente guarda em uma tabela)
  const target = 50000;
  return { sold: rows[0].sold, target };
}

// ⚠️ Produtos com estoque baixo (menor que 5 unidades)
export async function getLowStock() {
  const [rows] = await connection.query(`
    SELECT id, nome, estoque, preco
    FROM produtos
    WHERE estoque < 5;
  `);
  return rows;
}
