import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../styles/produtos.css";

export default function Produtos() {
  const location = useLocation();
  const LIMITE_ESTOQUE_BAIXO = 2;

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [resumo, setResumo] = useState({
    totalItens: 0,
    valorTotal: 0,
    baixoEstoque: 0,
  });
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate();

  async function carregarProdutos() {
    const resp = await api.get("/produtos");
    setProdutos(resp.data);
  }

  async function carregarCategorias() {
    const resp = await api.get("/categorias");
    setCategorias(resp.data);
  }

  // ✨ Destaque animado quando vem do dashboard
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get("id");
    if (idParam) {
      const linha = document.querySelector(`tr[data-id="${idParam}"]`);
      if (linha) {
        linha.classList.add("linha-destaque");
        linha.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => linha.classList.remove("linha-destaque"), 5000);
      }
    }
  }, [location, produtos]);

  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      const totalItens = produtos.length;
      const valorTotal = produtos.reduce(
        (acc, p) => acc + Number(p.preco || 0) * (p.estoque || 0),
        0
      );
      const baixoEstoque = produtos.filter(
        (p) => p.estoque < LIMITE_ESTOQUE_BAIXO
      ).length;
      setResumo({ totalItens, valorTotal, baixoEstoque });
    }
  }, [produtos]);

  async function salvarEdicao(produto) {
    await api.put(`/produtos/${produto.id}`, produto);
    setEditando(null);
    carregarProdutos();
  }

  async function deletarProduto(id) {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
    }
  }

  return (
    <div className="produtos-page">
      <Sidebar />

      <div className="produtos-content">
        <div className="produtos-header">
          <h1>Produtos</h1>
          <div className="btn-group">
            <button
              className="btn-primario"
              onClick={() => navigate("/produtos/novo")}
            >
              ➕ Novo Produto
            </button>
            <button
              className="btn-secundario"
              onClick={() => navigate("/categorias/nova")}
            >
              📦 Nova Categoria
            </button>
          </div>
        </div>

        {/* Cards de resumo */}
        <div className="resumo-cards">
          <div className="card">
            <p className="card-label">Total de Produtos</p>
            <p className="card-value">{resumo.totalItens}</p>
          </div>
          <div className="card">
            <p className="card-label">Valor Total em Estoque</p>
            <p className="card-value">
              {resumo.valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="card">
            <p className="card-label">Produtos com Baixo Estoque</p>
            <p className="card-value">{resumo.baixoEstoque}</p>
          </div>
        </div>

        {/* Tabela */}
        <div className="card tabela-card">
          <div className="tabela-head">
            <h3>Lista de Produtos</h3>
            <input
              className="filtro"
              placeholder="Pesquisar produto..."
              onChange={(e) => {
                const termo = e.target.value.toLowerCase();
                document.querySelectorAll(".tabela tbody tr").forEach((tr) => {
                  tr.style.display = tr.innerText.toLowerCase().includes(termo)
                    ? ""
                    : "none";
                });
              }}
            />
          </div>

          <div className="tabela-wrap">
            <table className="tabela">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Categoria</th>
                  <th style={{ width: 180 }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => (
                  <tr
                    key={p.id}
                    data-id={p.id}
                    className={
                      p.estoque < LIMITE_ESTOQUE_BAIXO ? "estoque-baixo" : ""
                    }
                  >
                    <td>{p.id}</td>

                    {/* Nome */}
                    <td>
                      {editando === p.id ? (
                        <input
                          value={p.nome}
                          onChange={(e) =>
                            setProdutos((prev) =>
                              prev.map((x) =>
                                x.id === p.id
                                  ? { ...x, nome: e.target.value }
                                  : x
                              )
                            )
                          }
                        />
                      ) : (
                        p.nome
                      )}
                    </td>

                    {/* Preço */}
                    <td>
                      {editando === p.id ? (
                        <input
                          type="number"
                          value={p.preco}
                          onChange={(e) =>
                            setProdutos((prev) =>
                              prev.map((x) =>
                                x.id === p.id
                                  ? { ...x, preco: e.target.value }
                                  : x
                              )
                            )
                          }
                        />
                      ) : (
                        Number(p.preco).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      )}
                    </td>

                    {/* Estoque */}
                    <td>
                      {editando === p.id ? (
                        <input
                          type="number"
                          value={p.estoque}
                          onChange={(e) =>
                            setProdutos((prev) =>
                              prev.map((x) =>
                                x.id === p.id
                                  ? { ...x, estoque: e.target.value }
                                  : x
                              )
                            )
                          }
                        />
                      ) : (
                        <>
                          {p.estoque}
                          {p.estoque < LIMITE_ESTOQUE_BAIXO && (
                            <span className="badge-alerta">⚠️</span>
                          )}
                        </>
                      )}
                    </td>

                    {/* Categoria */}
                    <td>
                      {editando === p.id ? (
                        <select
                          value={p.categoria_id || ""}
                          onChange={(e) =>
                            setProdutos((prev) =>
                              prev.map((x) =>
                                x.id === p.id
                                  ? {
                                      ...x,
                                      categoria_id: e.target.value,
                                      categoria_nome:
                                        categorias.find(
                                          (c) =>
                                            c.id === Number(e.target.value)
                                        )?.nome || "",
                                    }
                                  : x
                              )
                            )
                          }
                        >
                          <option value="">Sem categoria</option>
                          {categorias.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.nome}
                            </option>
                          ))}
                        </select>
                      ) : (
                        p.categoria_nome || "-"
                      )}
                    </td>

                    {/* Ações */}
                    <td>
                      {editando === p.id ? (
                        <div className="acoes-inline">
                          <button
                            className="btn-small btn-save"
                            onClick={() => salvarEdicao(p)}
                          >
                            💾 Salvar
                          </button>
                          <button
                            className="btn-small btn-cancel"
                            onClick={() => setEditando(null)}
                          >
                            ✖ Cancelar
                          </button>
                        </div>
                      ) : (
                        <div className="acoes-inline">
                          <button
                            className="btn-small"
                            onClick={() => setEditando(p.id)}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            className="btn-small btn-danger"
                            onClick={() => deletarProduto(p.id)}
                          >
                            🗑️ Excluir
                          </button>
                        </div>
                      )}
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
