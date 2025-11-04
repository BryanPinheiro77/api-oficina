import "./Contact.css";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <section id="contato" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Entre em Contato</h2>
          <p className="contact-description">
            Estamos prontos para atender você. Fale conosco!
          </p>
        </div>

        <div className="contact-grid">
          <div>
            <div className="contact-info-card">
              <h3 className="contact-info-title">Informações de Contato</h3>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <div className="contact-info-label">Telefone</div>
                    <div className="contact-info-value">(11) 5928-4301</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <div className="contact-info-value">contato@radiadorespinheiro.com.br</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <div className="contact-info-label">Endereço</div>
                    <div className="contact-info-value">
                      Rua Olimpio Soares de Carvalho, 252<br />
                      Parque Grajaú - São Paulo - SP
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <svg className="contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <div className="contact-info-label">Horário de Funcionamento</div>
                    <div className="contact-info-value">Segunda a Sexta: 9h às 17h</div>
                    <div className="contact-info-value">Sábado: 9h às 13h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h3 className="contact-form-title">Envie uma Mensagem</h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Telefone"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Sua mensagem"
                  className="form-textarea"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-submit">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
