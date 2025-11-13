import * as repo from '../repository/vendasRepository.js';
import { Router } from 'express';

const endpoints = Router();

// Criar venda com múltiplos itens
endpoints.post('/vendas', async (req, resp) => {
  try {
    const { cliente_id, formaPagamento, itens } = req.body;

    if (!itens || itens.length === 0)
      return resp.status(400).send({ erro: "Nenhum item informado." });

    const id = await repo.criarVenda(cliente_id, formaPagamento, itens);

    resp.send({ novaVenda: id });
  } catch (err) {
    console.error("Erro ao criar venda:", err);
    resp.status(500).send({ erro: "Erro interno no servidor" });
  }
});

// Listar vendas (somente cabeçalho)
endpoints.get('/vendas', async (req, resp) => {
  try {
    const lista = await repo.listarVendas();
    resp.send(lista);
  } catch (err) {
    console.error("Erro ao listar vendas:", err);
    resp.status(500).send({ erro: "Erro interno no servidor" });
  }
});

// Dashboard resumo
endpoints.get('/vendas/dashboard/resumo', async (req, resp) => {
  try {
    const dados = await repo.dashboardResumo();
    resp.send(dados);
  } catch (err) {
    console.error("Erro no dashboard:", err);
    resp.status(500).send({ erro: "Erro interno no servidor" });
  }
});

// Buscar venda completa
endpoints.get('/vendas/:id', async (req, resp) => {
  try {
    const venda = await repo.buscarPorId(req.params.id);

    if (!venda)
      return resp.status(404).send({ erro: "Venda não encontrada" });

    resp.send(venda);
  } catch (err) {
    console.error("Erro:", err);
    resp.status(500).send({ erro: "Erro interno no servidor" });
  }
});

// Deletar venda
endpoints.delete('/vendas/:id', async (req, resp) => {
  try {
    const linhas = await repo.deletarVenda(req.params.id);

    if (linhas === 0)
      resp.status(404).send({ erro: "Venda não encontrada" });
    else
      resp.sendStatus(204);

  } catch (err) {
    console.error("Erro:", err);
    resp.status(500).send({ erro: "Erro interno no servidor" });
  }
});

export default endpoints;
