import { Sparkles, ShieldCheck, Car, Wrench } from "lucide-react";

const services = [
  {
    title: "Polimento automotivo",
    desc: "Remove manchas leves, riscos superficiais e devolve brilho à pintura.",
    icon: Sparkles,
  },
  {
    title: "Cristalização",
    desc: "Proteção e acabamento para manter o brilho por mais tempo.",
    icon: ShieldCheck,
  },
  {
    title: "Higienização interna",
    desc: "Limpeza de bancos, painel, carpetes e acabamento interno.",
    icon: Car,
  },
  {
    title: "Restauração de faróis",
    desc: "Correção de faróis amarelados ou foscos.",
    icon: Wrench,
  },
];

function Services() {
  return (
    <section id="servicos" className="services">
      <div className="container">
        <div className="services-header">
          <h2>Serviços disponíveis</h2>
          <p>
            Cards simples para o cliente entender rapidamente o que a oficina faz.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div className="service-card" key={service.title}>
                <div className="service-icon">
                  <Icon size={24} />
                </div>

                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;