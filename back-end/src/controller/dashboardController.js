import { Router } from "express";
import * as repo from "../repository/dashboardRepository.js";

const endpoints = Router();

// 📦 Total de produtos e valor total do estoque
endpoints.get("/dashboard/overview", async (req, resp) => {
  try {
    const data = await repo.getOverview();
    resp.send(data);
  } catch (err) {
    console.error("Erro ao carregar overview:", err);
    resp.status(500).send({ erro: "Erro ao carregar overview." });
  }
});

// 💰 Resumo de vendas
endpoints.get("/dashboard/sales-summary", async (req, resp) => {
  try {
    const data = await repo.getSalesSummary();
    resp.send(data);
  } catch (err) {
    console.error("Erro ao carregar resumo de vendas:", err);
    resp.status(500).send({ erro: "Erro ao carregar resumo de vendas." });
  }
});

// ⚠️ Produtos com estoque baixo
endpoints.get("/dashboard/low-stock", async (req, resp) => {
  try {
    const data = await repo.getLowStock();
    resp.send(data);
  } catch (err) {
    console.error("Erro ao carregar estoque baixo:", err);
    resp.status(500).send({ erro: "Erro ao carregar estoque baixo." });
  }
});

export default endpoints;
