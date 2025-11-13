import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import "../styles/novaCategoria.css";

export default function NovaCategoria() {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  async function salvar(e) {
    e.preventDefault();
    await api.post("/categorias", { nome });
    navigate("/produtos");
  }

  return (
    <div className="nova-page">
      <Sidebar />

      <div className="nova-content">
        <div className="nova-card">
          <h1>Nova Categoria</h1>

          <form onSubmit={salvar}>
            <input
              placeholder="Nome da categoria"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <div className="btns">
              <button type="submit" className="btn-primary">
                Salvar
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
    </div>
  );
}
