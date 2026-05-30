import { Clock, MapPin, Phone } from "lucide-react";

const galleryImages = [
  {
    label: "Antes",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=900&auto=format&fit=crop",
  },
  {
    label: "Depois",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=900&auto=format&fit=crop",
  },
];

function About() {
  return (
    <section className="about-section">
      <div className="container about-grid">
        <div>
          <h2>Antes e depois</h2>

          <p className="about-text">
            Espaço para fotos reais dos carros atendidos, mostrando o resultado
            do polimento, higienização e acabamento.
          </p>

          <div className="before-after-gallery">
            {galleryImages.map((item) => (
              <div className="gallery-card" key={item.label}>
                <img src={item.image} alt={item.label} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card">
          <h3>Informações úteis</h3>

          <div className="info-list">
            <p>
              <Clock size={18} />
              Segunda a sábado, 08:00 às 18:00
            </p>

            <p>
              <MapPin size={18} />
              Rua Exemplo, 123 - Bairro Centro
            </p>

            <p>
              <Phone size={18} />
              (31) 99999-9999
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;