import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/vendas.css";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const navigate = useNavigate();

  async function carregarVendas() {
    const resp = await api.get("/vendas");
    setVendas(resp.data);
  }

  useEffect(() => {
    carregarVendas();
  }, []);

  // EXCLUIR VENDA
  async function excluirVenda(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta venda?"
    );

    if (!confirmar) return;

    await api.delete(`/vendas/${id}`);

    // Remove instantâneo da lista
    setVendas((prev) => prev.filter((v) => v.id !== id));
  }

  return (
    <div className="vendas-page">
      <Sidebar />

      <div className="vendas-content">
        <div className="vendas-header">
          <h1>Histórico de Vendas</h1>

          <button
            className="btn-nova-venda"
            onClick={() => navigate("/vendas/nova")}
          >
            + Nova Venda
          </button>
        </div>

        {/* Tabela */}
        <div className="tabela-vendas">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Forma de Pagamento</th>
                <th>Data</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {vendas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="muted">
                    Nenhuma venda registrada.
                  </td>
                </tr>
              ) : (
                vendas.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.produto_nome}</td>
                    <td>{v.quantidade}</td>
                    <td>
                      {Number(v.total).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>{v.forma_pagamento}</td>
                    <td>
                      {new Date(v.criado_em).toLocaleDateString("pt-BR")}
                    </td>
                    <td>
                      <button
                        className="btn-remove-venda"
                        onClick={() => excluirVenda(v.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
