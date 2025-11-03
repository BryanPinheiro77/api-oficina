import * as repo from '../repository/usuarioRepository.js';
import { Router } from 'express';
const endpoints = Router();

// Registrar novo usuário (somente via Thunder/Postman)
endpoints.post('/usuarios', async (req, resp) => {
  try {
    const usuario = req.body;
    const novoId = await repo.inserirUsuario(usuario);
    resp.send({ novoId });
  } catch (err) {
    resp.status(500).send({ erro: err.message });
  }
});

// Listar todos os usuários
endpoints.get('/usuarios', async (req, resp) => {
  try {
    const lista = await repo.listarUsuarios();
    resp.send(lista);
  } catch (err) {
    resp.status(500).send({ erro: err.message });
  }
});

// Deletar usuário
endpoints.delete('/usuarios/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const linhas = await repo.deletarUsuario(id);

    if (linhas === 0)
      resp.status(404).send({ erro: 'Usuário não encontrado' });
    else
      resp.send();
  } catch (err) {
    resp.status(500).send({ erro: err.message });
  }
});

export default endpoints;
