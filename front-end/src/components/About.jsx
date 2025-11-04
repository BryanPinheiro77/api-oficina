import "./About.css";

const stats = [
  { value: "20+", label: "Anos de Experiência", icon: "clock" },
  { value: "5000+", label: "Clientes Atendidos", icon: "users" },
  { value: "100%", label: "Garantia de Qualidade", icon: "award" },
  { value: "98%", label: "Satisfação", icon: "target" },
];

function StatIcon({ type }) {
  if (type === "clock") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (type === "users") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  if (type === "award") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    );
  }
  if (type === "target") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="about-title">Sobre a Radiadores Pinheiro</h2>
            <p className="about-text">
              Fundada há mais de 20 anos, a Radiadores Pinheiro é referência em conserto e
              manutenção de radiadores automotivos. Nossa equipe altamente qualificada utiliza
              equipamentos modernos e técnicas avançadas para garantir o melhor resultado.
            </p>
            <p className="about-text">
              Trabalhamos com radiadores de carros, caminhões, motos e máquinas agrícolas.
              Nossa missão é oferecer serviços de excelência com preços justos e atendimento
              personalizado.
            </p>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">
                    <StatIcon type={stat.icon} />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1637640125496-31852f042a60?auto=format&fit=crop&w=1080&q=80"
              alt="Equipe Radiadores Pinheiro"
              className="about-image"
            />
            <div className="about-image-accent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
