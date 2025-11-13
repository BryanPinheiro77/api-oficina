import Navbar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import api from "../services/api";
import "./../styles/dashboard.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const navigate = useNavigate();

  const [overview, setOverview] = useState({ totalItens: 0, stockValue: 0 });
  const [lowStock, setLowStock] = useState([]);

  const [period, setPeriod] = useState("dia");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [salesData, setSalesData] = useState({
    total: 0,
    quantidade: 0,
    series: [],
  });

  const [meta, setMeta] = useState({ sold: 0, target: 50000 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBasics() {
      const ov = await api.get("/dashboard/overview");
      const ls = await api.get("/dashboard/low-stock");
      const ms = await api.get("/dashboard/sales-summary");

      setOverview(ov.data);
      setLowStock(ls.data || []);
      setMeta(ms.data);
    }
    loadBasics();
  }, []);

  useEffect(() => {
    loadSales();
  }, [period, startDate, endDate]);

  async function loadSales() {
    setLoading(true);

    try {
      let url = `/dashboard/sales?period=${period}`;

      if (period === "custom" && startDate && endDate) {
        const s = startDate.toISOString().split("T")[0];
        const e = endDate.toISOString().split("T")[0];
        url += `&start=${s}&end=${e}`;
      }

      const resp = await api.get(url);
      setSalesData(resp.data);
    } catch (e) {
      console.error("Erro ao carregar vendas:", e);
    }

    setLoading(false);
  }

  const paddedSeries =
    salesData.series.length > 1
      ? salesData.series
      : [
          { dia: " ", total: 0 },
          ...(salesData.series.length === 1 ? salesData.series : []),
          { dia: "  ", total: 0 },
        ];

  const lineChartData = {
    labels: paddedSeries.map((d) =>
      new Date(d.dia).toLocaleDateString("pt-BR")
    ),
    datasets: [
      {
        label: "Total vendido (R$)",
        data: paddedSeries.map((d) => d.total),
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34, 211, 238, 0.25)",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#f9fafb" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
      },
      y: {
        ticks: { color: "#94a3b8" },
      },
    },
  };

  const pizzaData = {
    labels: ["Vendido", "Faltante"],
    datasets: [
      {
        data: [
          meta.sold,
          Math.max(meta.target - meta.sold, 0),
        ],
        backgroundColor: ["#22d3ee", "#0ea5b4"],
        borderWidth: 0,
      },
    ],
  };

  const pizzaOptions = {
    plugins: {
      legend: { labels: { color: "#f9fafb" } },
    },
  };

  const produtosBaixoEstoque = lowStock.filter((p) => p.estoque < 2);

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dash-wrap">
        <div className="dash-header">
          <h1>Dashboard</h1>
        </div>

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

        {/* FILTRO */}
        <div className="card filter-card">
          <h3>Filtrar vendas por período</h3>

          <select
            className="period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="dia">Hoje</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Últimos 30 dias</option>
            <option value="ano">Este ano</option>
            <option value="custom">Personalizado</option>
          </select>

          {period === "custom" && (
            <div className="date-range">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Data inicial"
                dateFormat="dd/MM/yyyy"
              />

              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Data final"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          )}
        </div>

        {/* CARDS DO PERÍODO */}
        <div className="dash-grid-cards">
          <div className="card">
            <p className="card-label">Total Vendido</p>
            <p className="card-value">
              {salesData.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="card">
            <p className="card-label">Quantidade de Vendas</p>
            <p className="card-value">{salesData.quantidade}</p>
          </div>
        </div>

        {/* GRÁFICOS LADO A LADO */}
        <div className="charts-row">
          <div className="card chart-card">
            <h3>Gráfico de Vendas</h3>

            {loading ? (
              <div className="skeleton skeleton-chart" />
            ) : (
              <Line data={lineChartData} options={lineOptions} />
            )}
          </div>

          <div className="card chart-card">
            <h3>Meta Mensal</h3>
            <Doughnut data={pizzaData} options={pizzaOptions} />
          </div>
        </div>

        {/* ESTOQUE BAIXO */}
        <div className="card table-card">
          <div className="table-head">
            <h3>Itens com Estoque Baixo</h3>
            <input
              className="filter"
              placeholder="Filtrar produtos…"
              onChange={(e) => {
                const term = e.target.value.toLowerCase();
                const rows = document.querySelectorAll(".table tbody tr");
                rows.forEach((tr) => {
                  tr.style.display = tr.innerText.toLowerCase().includes(term)
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
                  <th>Qtd</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {produtosBaixoEstoque.length === 0 && (
                  <tr>
                    <td colSpan="5" className="muted">
                      Nenhum produto com estoque baixo!
                    </td>
                  </tr>
                )}

                {produtosBaixoEstoque.map((p) => (
                  <tr key={p.id} className="low-stock">
                    <td>{p.id}</td>
                    <td>{p.nome}</td>
                    <td>{p.estoque}</td>
                    <td>{p.preco}</td>
                    <td>
                      <button
                        className="btn-small"
                        onClick={() => navigate(`/produtos?id=${p.id}`)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
