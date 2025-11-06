import * as repo from '../repository/produtosRepository.js';
import { Router } from 'express';

const endpoints = Router();

// Cadastrar produto
endpoints.post('/produtos', async (req, resp) => {
  try {
    const produto = req.body;

    if (!produto.nome || produto.preco == null || produto.estoque == null)
      return resp.status(400).send({ erro: 'Nome, preço e estoque são obrigatórios.' });

    const novoId = await repo.inserirProduto(produto);
    resp.send({ id: novoId });
  } catch (err) {
    console.error('Erro ao inserir produto:', err.message);
    resp.status(500).send({ erro: 'Erro ao cadastrar produto.' });
  }
});

// Listar produtos
endpoints.get('/produtos', async (req, resp) => {
  try {
    const lista = await repo.listarProdutos();
    resp.send(lista);
  } catch (err) {
    resp.status(500).send({ erro: 'Erro ao listar produtos.' });
  }
});

// Alterar produto
endpoints.put('/produtos/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const produto = req.body;
    const linhas = await repo.alterarProduto(id, produto);

    if (linhas === 0)
      resp.status(404).send({ erro: 'Produto não encontrado' });
    else
      resp.send();
  } catch (err) {
    resp.status(500).send({ erro: 'Erro ao alterar produto.' });
  }
});

// Deletar produto
endpoints.delete('/produtos/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const linhas = await repo.deletarProduto(id);

    if (linhas === 0)
      resp.status(404).send({ erro: 'Produto não encontrado' });
    else
      resp.send();
  } catch (err) {
    resp.status(500).send({ erro: 'Erro ao deletar produto.' });
  }
});

// Buscar por ID
endpoints.get('/produtos/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const item = await repo.buscarPorId(id);

    if (!item)
      resp.status(404).send({ erro: 'Produto não encontrado' });
    else
      resp.send(item);
  } catch (err) {
    resp.status(500).send({ erro: 'Erro ao buscar produto.' });
  }
});

// Filtro por nome
endpoints.get('/produtos/filtro', async (req, resp) => {
  try {
    const nome = req.query.nome || '';
    const lista = await repo.filtrarPorNome(nome);
    resp.send(lista);
  } catch (err) {
    resp.status(500).send({ erro: 'Erro ao filtrar produtos.' });
  }
});

export default endpoints;
