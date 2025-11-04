import React, { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../styles/landing.css";

export default function Landing() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.classList.add("visible");
          } else {
            target.classList.remove("visible"); // remove quando sai da tela
          }
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="landing">
      <Header />
      <main style={{ marginTop: "80px" }}>
        <Hero />
        <section id="about" className="fade-in">
          <About />
        </section>
        <section id="services" className="fade-in">
          <Services />
        </section>
        <section id="testimonials" className="fade-in">
          <Testimonials />
        </section>
        <section id="contact" className="fade-in">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
