import image1 from "../assets/images/antes-depois/image1.jpg";
import image2 from "../assets/images/antes-depois/image2.jpg";
import image3 from "../assets/images/antes-depois/image3.jpg";
import image4 from "../assets/images/antes-depois/image4.jpg";
import image5 from "../assets/images/antes-depois/image5.jpg";
import image6 from "../assets/images/antes-depois/image6.jpg";
import image7 from "../assets/images/antes-depois/image7.jpg";
import image8 from "../assets/images/antes-depois/image8.jpg";

const galleryImages = [
  {
    label: "Antes e Depois",
    image: image1,
  },
  {
    label: "Polimento",
    image: image2,
  },
  {
    label: "Restauração de Faróis",
    image: image3,
  },
  {
    label: "Higienização Interna",
    image: image4,
  },
  {
    label: "Cristalização",
    image: image5,
  },
  {
    label: "Higienização Interna",
    image: image6,
  },
  {
    label: "Polimento",
    image: image7,
  },
  {
    label: "Higienização Interna",
    image: image8,
  },
];

function About() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-header">
          <h2>Portfólio de serviços</h2>

          <p className="about-text">
            Confira alguns resultados de serviços realizados em veículos atendidos pela oficina.
          </p>
        </div>

        <div className="before-after-gallery">
          {galleryImages.map((item, index) => (
            <div
              className={`gallery-card ${index === 0 ? "gallery-card-large" : ""}`}
              key={`${item.label}-${index}`}
            >
              <img src={item.image} alt={item.label} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;