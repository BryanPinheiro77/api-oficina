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
    <div className="produtos-page">
      <Sidebar />
      <div className="produtos-content">
        <h1>Nova Categoria</h1>
        <form onSubmit={salvar} className="form-produto">
          <input
            placeholder="Nome da categoria"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button type="submit" className="btn-primario">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
