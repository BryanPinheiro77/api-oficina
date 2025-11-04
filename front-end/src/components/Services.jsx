import "./Services.css";

const services = [
  {
    title: "Conserto de Radiadores",
    description: "Reparos completos em radiadores automotivos de todos os tipos e modelos de veículos.",
    icon: "wrench"
  },
  {
    title: "Limpeza e Teste",
    description: "Limpeza profunda e testes de pressão para garantir o funcionamento perfeito.",
    icon: "droplet"
  },
  {
    title: "Sistema de Arrefecimento",
    description: "Manutenção completa do sistema de arrefecimento do seu veículo.",
    icon: "thermometer"
  },
  {
    title: "Troca de Radiadores",
    description: "Instalação de radiadores novos e remanufaturados com garantia.",
    icon: "shield"
  },
  {
    title: "Serviço Rápido",
    description: "Atendimento ágil para você não perder tempo. Maioria dos serviços no mesmo dia.",
    icon: "zap"
  },
  {
    title: "Garantia",
    description: "Todos os nossos serviços possuem garantia de qualidade e satisfação.",
    icon: "check"
  }
];

function ServiceIcon({ type }) {
  if (type === "wrench") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }
  if (type === "droplet") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    );
  }
  if (type === "thermometer") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      </svg>
    );
  }
  if (type === "shield") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (type === "zap") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }
  if (type === "check") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );
  }
}

export default function Services() {
  return (
    <section id="servicos" className="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Nossos Serviços</h2>
          <p className="services-description">
            Oferecemos soluções completas para o sistema de arrefecimento do seu veículo
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <ServiceIcon type={service.icon} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
