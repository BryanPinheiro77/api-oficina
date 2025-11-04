import { useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* LOGO — ao clicar, vai para /login */}
          <button
            onClick={() => navigate("/login")}
            className="header-logo-btn"
          >
            <img
              src={logo}
              alt="Radiadores Pinheiro"
              className="header-logo-img"
            />
            <div className="header-logo-text">
              <h1 className="header-title">Radiadores Pinheiro</h1>
              <p className="header-subtitle">Especialistas em radiadores</p>
            </div>
          </button>

          {/* MENU DE NAVEGAÇÃO */}
          <nav className="header-nav">
            <a href="#services" className="header-nav-link">
              Serviços
            </a>
            <a href="#about" className="header-nav-link">
              Sobre
            </a>
            <a href="#testimonials" className="header-nav-link">
              Depoimentos
            </a>
            <a href="#contact" className="header-nav-btn">
              Contato
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
