import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <svg className="footer-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span className="footer-logo-text">Radiadores Pinheiro</span>
            </div>
            <p className="footer-description">
              Especialistas em radiadores automotivos há mais de 20 anos.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Serviços</h4>
            <ul className="footer-list">
              <li><a href="#servicos" className="footer-link">Conserto de Radiadores</a></li>
              <li><a href="#servicos" className="footer-link">Limpeza e Teste</a></li>
              <li><a href="#servicos" className="footer-link">Troca de Radiadores</a></li>
              <li><a href="#servicos" className="footer-link">Manutenção</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Links Rápidos</h4>
            <ul className="footer-list">
              <li><a href="#sobre" className="footer-link">Sobre Nós</a></li>
              <li><a href="#depoimentos" className="footer-link">Depoimentos</a></li>
              <li><a href="#contato" className="footer-link">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Redes Sociais</h4>
            <div className="footer-social">
              <a href="#" className="footer-social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="footer-social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="footer-social-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Radiadores Pinheiro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
