import "./Testimonials.css";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Motorista de Caminhão",
    text: "Excelente atendimento! Consertaram o radiador do meu caminhão em poucas horas. Serviço de qualidade com preço justo.",
    rating: 5
  },
  {
    name: "Maria Santos",
    role: "Proprietária de Carro",
    text: "Profissionais muito competentes. Explicaram todo o problema e fizeram o conserto com garantia. Recomendo!",
    rating: 5
  },
  {
    name: "João Oliveira",
    role: "Empresário",
    text: "Já levo os veículos da minha frota há anos. Sempre um atendimento excelente e serviço impecável.",
    rating: 5
  }
];

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">O Que Dizem Nossos Clientes</h2>
          <p className="testimonials-description">
            A satisfação dos nossos clientes é nossa maior conquista
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="star">
                    <StarIcon />
                  </div>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div>
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
