import "./../styles/footer.css";
import { Phone, MapPin, Clock } from "lucide-react";

function Footer() {
  return (
    <footer id="contato" className="footer">
      <div className="container footer-content">

        <div className="footer-brand">
          <h3>PoliCar</h3>

          <p>
            Especialistas em estética automotiva, oferecendo serviços de
            polimento, cristalização, higienização interna e restauração de
            faróis.
          </p>
        </div>

        <div className="footer-info">
          <h4>Contato</h4>

          <p>
            <Phone size={16} />
            (31) 99999-9999
          </p>

          <p>
            <MapPin size={16} />
            Betim - MG
          </p>

          <p>
            <Clock size={16} />
            Segunda a sábado • 08:00 às 18:00
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 PoliCar. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;