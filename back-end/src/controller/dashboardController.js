import { Router } from "express";
import * as repo from "../repository/dashboardRepository.js";

const endpoints = Router();

/* ============================================
   📦 OVERVIEW DE ESTOQUE
============================================ */
endpoints.get("/dashboard/overview", async (req, resp) => {
  try {
    const data = await repo.getOverview();
    resp.send(data);
  } catch (err) {
    console.error("Erro ao carregar overview:", err);
    resp.status(500).send({ erro: "Erro ao carregar overview." });
  }
});

/* ============================================
   💰 RESUMO DE VENDAS (meta e total vendido)
============================================ */
endpoints.get("/dashboard/sales-summary", async (req, resp) => {
  try {
    const data = await repo.getSalesSummary();
    resp.send(data);
  } catch (err) {
    console.error("Erro ao carregar resumo de vendas:", err);
    resp.status(500).send({ erro: "Erro ao carregar resumo de vendas." });
  }
});

/* ============================================
   ⚠️ PRODUTOS COM ESTOQUE BAIXO
============================================ */
endpoints.get("/dashboard/low-stock", async (req, resp) => {
  try {
    const data = await repo.getLowStock();
    resp.send(data);
  } catch (err) {
    console.error("Erro ao carregar estoque baixo:", err);
    resp.status(500).send({ erro: "Erro ao carregar estoque baixo." });
  }
});

/* ============================================
   📊 NOVO: FILTRO DE VENDAS POR PERÍODO
   /dashboard/sales?period=dia|semana|mes|ano|custom
============================================ */
endpoints.get("/dashboard/sales", async (req, resp) => {
  try {
    const { period = "dia", start, end } = req.query;

    if (period === "custom" && (!start || !end)) {
      return resp
        .status(400)
        .send({ erro: "Para período personalizado informe start e end." });
    }

    const data = await repo.getSalesByPeriod(period, start, end);
    resp.send(data);
  } catch (err) {
    console.error("Erro ao carregar vendas por período:", err);
    resp.status(500).send({ erro: "Erro ao carregar vendas." });
  }
});

export default endpoints;
