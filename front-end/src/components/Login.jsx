import "./Login.css";

export default function Login({ onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Funcionalidade de login em desenvolvimento");
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <button className="login-back-btn" onClick={onBack}>
          <svg className="login-back-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Voltar para o site
        </button>

        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <svg className="login-logo-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <div className="login-logo-text">
                <h1 className="login-title">Radiadores Pinheiro</h1>
                <p className="login-subtitle">Área Administrativa</p>
              </div>
            </div>
            <p className="login-description">Entre com suas credenciais</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">Email</label>
              <div className="login-input-wrapper">
                <svg className="login-input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="login-input"
                  required
                />
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="password" className="login-label">Senha</label>
              <div className="login-input-wrapper">
                <svg className="login-input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="login-input"
                  required
                />
              </div>
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" className="login-checkbox" />
                Lembrar-me
              </label>
              <a href="#" className="login-forgot">
                Esqueceu a senha?
              </a>
            </div>

            <button type="submit" className="login-submit">
              Entrar
            </button>
          </form>

          <div className="login-footer">
            Não tem uma conta?{" "}
            <a href="#" className="login-contact-link">
              Entre em contato
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
