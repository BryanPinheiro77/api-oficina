import * as repo from '../repository/categoriasRepository.js';
import { Router } from 'express';
const endpoints = Router();

endpoints.post('/categorias', async (req, resp) => {
  const { nome } = req.body;
  const id = await repo.inserirCategoria(nome);
  resp.send({ novoId: id });
});

endpoints.get('/categorias', async (req, resp) => {
  const lista = await repo.listarCategorias();
  resp.send(lista);
});

endpoints.put('/categorias/:id', async (req, resp) => {
  const id = req.params.id;
  const { nome } = req.body;
  const linhas = await repo.alterarCategoria(id, nome);

  if (linhas === 0)
    resp.status(404).send({ erro: 'Categoria não encontrada' });
  else
    resp.send();
});

endpoints.delete('/categorias/:id', async (req, resp) => {
  const id = req.params.id;
  const linhas = await repo.deletarCategoria(id);

  if (linhas === 0)
    resp.status(404).send({ erro: 'Categoria não encontrada' });
  else
    resp.send();
});

export default endpoints;
