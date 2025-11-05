import Navbar from "../components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from "../services/api";
import "./../styles/dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [overview, setOverview] = useState({
    totalItens: 0,
    stockValue: 0,
  });
  const [salesSummary, setSalesSummary] = useState({
    sold: 0,
    target: 50000,
  });
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const [ov, ss, ls] = await Promise.all([
          api.get("/dashboard/overview"),
          api.get("/dashboard/sales-summary"),
          api.get("/dashboard/low-stock"),
        ]);

        if (!ignore) {
          setOverview(ov.data || { totalItens: 0, stockValue: 0 });
          setSalesSummary(ss.data || { sold: 0, target: 0 });
          setLowStock(ls.data || []);
        }
      } catch (e) {
        if (!ignore)
          setErr("Não foi possível carregar os dados da dashboard.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const chartData = useMemo(() => {
    const sold = Number(salesSummary.sold || 0);
    const target = Number(salesSummary.target || 0);
    const missing = Math.max(target - sold, 0);

    return {
      labels: ["Vendas Realizadas", "Faltante"],
      datasets: [
        {
          data: [sold, missing],
          backgroundColor: ["#22d3ee", "#0ea5b4"],
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    };
  }, [salesSummary]);

  const chartOptions = useMemo(
    () => ({
      cutout: "65%",
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#f9fafb" },
        },
        tooltip: { enabled: true },
      },
    }),
    []
  );

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dash-wrap">
        <div className="dash-header">
          <h1>Bem-vindo(a)</h1>
          
        </div>

        {err && <div className="dash-alert">{err}</div>}

        <div className="dash-grid-cards">
          <div className="card">
            <p className="card-label">Total de Itens</p>
            <p className="card-value">{overview.totalItens}</p>
          </div>

          <div className="card">
            <p className="card-label">Valor Total em Estoque</p>
            <p className="card-value">
              {overview.stockValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>

        <div className="dash-row">
          <div className="card chart-card">
            <div className="chart-head">
              <span>Progresso de Vendas</span>
              <small>
                {salesSummary.sold.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                de{" "}
                {salesSummary.target.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </small>
            </div>

            <div className="chart-body">
              {loading ? (
                <div className="skeleton skeleton-chart" />
              ) : (
                <Doughnut data={chartData} options={chartOptions} />
              )}
            </div>
          </div>
        </div>

        <div className="card table-card">
          <div className="table-head">
            <h3>Itens com Estoque Baixo</h3>
            <input
              className="filter"
              placeholder="Filtrar produtos…"
              onChange={(e) => {
                const term = e.target.value.toLowerCase();
                const elRows = document.querySelectorAll(".table tbody tr");
                elRows.forEach((tr) => {
                  tr.style.display = tr.innerText
                    .toLowerCase()
                    .includes(term)
                    ? ""
                    : "none";
                });
              }}
            />
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Preço (R$)</th>
                  <th style={{ width: 120 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">
                      <div className="skeleton skeleton-row" />
                    </td>
                  </tr>
                ) : lowStock.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="muted">
                      Nenhum produto com estoque baixo!
                    </td>
                  </tr>
                ) : (
                  lowStock.map((p) => (
                    <tr key={p.id || p.code}>
                      <td>{p.code}</td>
                      <td>{p.name}</td>
                      <td>{p.qty}</td>
                      <td>
                        {Number(p.price || 0).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <button className="btn-small">Ver</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
