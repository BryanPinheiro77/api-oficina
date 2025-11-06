import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../styles/novoProduto.css";

export default function NovoProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categorias").then((resp) => setCategorias(resp.data));
  }, []);

  async function salvar(e) {
    e.preventDefault();

    // só envia categoria_id se o usuário escolheu uma
    const data = {
      nome,
      preco,
      estoque,
    };

    if (categoria) data.categoria_id = categoria;

    await api.post("/produtos", data);
    navigate("/produtos");
  }

  return (
    <div className="produto-page">
      <Sidebar />
      <div className="form-card">
        <h1>Novo Produto</h1>
        <form onSubmit={salvar}>
          <input
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Estoque"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            required
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Sem categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Salvar Produto
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => navigate("/produtos")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
