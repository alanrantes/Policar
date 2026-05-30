import { useEffect, useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";
import banner1 from "../assets/images/banner/banner1.jpg";
import banner2 from "../assets/images/banner/banner2.jpg";
import banner3 from "../assets/images/banner/banner3.jpg";
import banner4 from "../assets/images/banner/banner4.jpg";

const heroImages = [banner1, banner2, banner3, banner4];

function Hero({ onOpenModal }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) =>
        current === heroImages.length - 1 ? 0 : current + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  function openWhatsApp() {
    const phone = "5531990794541";
    const message =
      "Olá! Gostaria de tirar uma dúvida sobre os serviços da oficina.";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <section className="hero">
      <div className="hero-container">
        <div>
          <span className="hero-badge">Atendimento por agendamento</span>

          <h2>Seu carro bem cuidado, com brilho de novo.</h2>

          <p>
            Polimento, higienização, cristalização e restauração de faróis com
            foco no brilho, acabamento e valorização da pintura do veículo.
          </p>

          <div className="hero-actions">
            <button className="btn btn-orange" onClick={onOpenModal}>
              <CalendarDays size={18} />
              Agendar serviço
            </button>

            <button className="btn btn-hero-outline" onClick={openWhatsApp}>
              <MessageCircle size={18} />
              Tirar dúvida
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-image">
            {heroImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt="Carro em destaque"
                className={`hero-slide ${
                  index === currentImage ? "active" : ""
                }`}
              />
            ))}

            <div className="hero-image-info">
              <p>Acabamento com brilho, reflexo e cuidado na pintura.</p>
            </div>
          </div>

          <div className="hero-stats">
            <div>
              <strong>4+</strong>
              <span>serviços</span>
            </div>

            <div>
              <strong>Online</strong>
              <span>agenda</span>
            </div>

            <div>
              <strong>Local</strong>
              <span>oficina</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;