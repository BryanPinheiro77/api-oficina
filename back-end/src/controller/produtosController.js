import * as repo from '../repository/produtosRepository.js';
import { Router } from 'express';
const endpoints = Router();

// Cadastrar
endpoints.post('/produtos', async (req, resp) => {
  const produto = req.body;
  const novoId = await repo.inserirProduto(produto);
  resp.send({ novoId });
});

// Listar
endpoints.get('/produtos', async (req, resp) => {
  const lista = await repo.listarProdutos();
  resp.send(lista);
});

// Alterar
endpoints.put('/produtos/:id', async (req, resp) => {
  const id = req.params.id;
  const produto = req.body;
  const linhas = await repo.alterarProduto(id, produto);

  if (linhas === 0)
    resp.status(404).send({ erro: 'Produto não encontrado' });
  else
    resp.send();
});

// Deletar
endpoints.delete('/produtos/:id', async (req, resp) => {
  const id = req.params.id;
  const linhas = await repo.deletarProduto(id);

  if (linhas === 0)
    resp.status(404).send({ erro: 'Produto não encontrado' });
  else
    resp.send();
});

// Buscar por ID
endpoints.get('/produtos/:id', async (req, resp) => {
  const id = req.params.id;
  const item = await repo.buscarPorId(id);

  if (!item)
    resp.status(404).send({ erro: 'Produto não encontrado' });
  else
    resp.send(item);
});

// Filtro por nome
endpoints.get('/produtos/filtro', async (req, resp) => {
  const nome = req.query.nome;
  const lista = await repo.filtrarPorNome(nome);
  resp.send(lista);
});

export default endpoints;
