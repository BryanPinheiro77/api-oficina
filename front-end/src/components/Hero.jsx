import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <img
          src="https://images.unsplash.com/photo-1588294020274-1e23a4815b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByYWRpYXRvciUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MjIyMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Oficina Radiadores Pinheiro"
          className="hero-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-title">Especialistas em Radiadores</h2>
          <p className="hero-subtitle">
            Conserto, manutenção e troca de radiadores automotivos com qualidade e garantia
          </p>
          <p className="hero-description">
            Há mais de 20 anos cuidando do sistema de arrefecimento do seu veículo.
            Atendimento rápido, profissionais qualificados e preços justos.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn-primary">
              <svg
                className="hero-btn-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Ligar Agora
            </button>
            <button className="hero-btn-secondary">
              <svg
                className="hero-btn-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Como Chegar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
