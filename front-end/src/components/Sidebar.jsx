import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Radiadores Pinheiro" />
      </div>

      <nav className="sidebar-nav">
        <button onClick={() => navigate("/dashboard")} className="sidebar-link">Dashboard</button>
        <button onClick={() => navigate("/produtos")} className="sidebar-link">Produtos</button>
        <button onClick={() => navigate("/vendas")} className="sidebar-link">Vendas</button>
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>Sair</button>
    </aside>
  );
}
