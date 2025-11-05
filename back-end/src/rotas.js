import express from 'express';
import usuarioController from './controller/usuarioController.js';
import loginController from './controller/loginController.js';
import produtosController from './controller/produtosController.js';
import categoriasController from './controller/categoriasController.js';
import vendasController from './controller/VendasController.js';
import dashboardController from './controller/dashboardController.js';

export function adicionarRotas(api) {
  api.use(usuarioController);
  api.use(loginController);
  api.use(produtosController);
  api.use(categoriasController);
  api.use(vendasController);
  api.use(dashboardController);
}
