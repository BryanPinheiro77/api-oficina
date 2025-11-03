import * as repo from '../repository/loginRepository.js';
import { generateToken } from '../utils/jtw.js';
import { Router } from 'express';

const endpoints = Router();

// Login
endpoints.post('/login', async (req, resp) => {
  try {
    const { email, senha } = req.body;
    const usuario = await repo.autenticar(email, senha);

    if (!usuario)
      return resp.status(401).send({ erro: 'Usuário ou senha inválidos.' });

    const token = generateToken(usuario);
    resp.send({ token, usuario });
  } catch (err) {
    resp.status(500).send({ erro: err.message });
  }
});

export default endpoints;
