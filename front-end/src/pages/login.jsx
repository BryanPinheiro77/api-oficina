import { useState } from "react";
import api from "../services/api";
import "./../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const resp = await api.post("/login", { email, senha });
      localStorage.setItem("token", resp.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Credenciais inválidas");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login - Administrador</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
