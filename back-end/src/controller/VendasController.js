import * as repo from '../repository/vendasRepository.js';
import { Router } from 'express';
const endpoints = Router();

// Criar venda
endpoints.post('/vendas', async (req, resp) => {
  const { cliente_id, itens } = req.body;
  const id = await repo.criarVenda(cliente_id, itens);
  resp.send({ novaVenda: id });
});

// Listar vendas
endpoints.get('/vendas', async (req, resp) => {
  const lista = await repo.listarVendas();
  resp.send(lista);
});

// Buscar venda por ID
endpoints.get('/vendas/:id', async (req, resp) => {
  const id = req.params.id;
  const venda = await repo.buscarPorId(id);

  if (!venda)
    resp.status(404).send({ erro: 'Venda não encontrada' });
  else
    resp.send(venda);
});

// Excluir venda
endpoints.delete('/vendas/:id', async (req, resp) => {
  const id = req.params.id;
  const linhas = await repo.deletarVenda(id);

  if (linhas === 0)
    resp.status(404).send({ erro: 'Venda não encontrada' });
  else
    resp.send();
});

export default endpoints;