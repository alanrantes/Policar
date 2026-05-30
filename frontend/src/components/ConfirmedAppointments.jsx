import { useState } from "react";
import {
  CalendarDays,
  Car,
  Droplet,
  MessageCircle,
  Trash2,
  Wrench,
} from "lucide-react";
import { services } from "../data/services";

function ConfirmedAppointments({
  appointments,
  updateAppointmentStatus,
  deleteAppointment,
}) {
  const [dateFilter, setDateFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("Todos");
  const today = new Date().toISOString().split("T")[0];

  const confirmedAppointments = appointments.filter(
    (item) => item.status === "Confirmado"
  );

  const filteredConfirmedAppointments = confirmedAppointments.filter((item) => {
    const matchesDate = !dateFilter || item.data === dateFilter;
    const matchesService =
      serviceFilter === "Todos" || item.servico === serviceFilter;

    return matchesDate && matchesService;
  });

  return (
    <div className="confirmed-card">
      <div className="confirmed-header">
        <div>
          <h3>Agendamentos confirmados</h3>
          <p>Veículos confirmados e prontos para atendimento.</p>
        </div>

        <span>{filteredConfirmedAppointments.length} exibido(s)</span>
      </div>

      <div className="confirmed-filters">
        <div>
          <label>Filtrar por data</label>
          <input
            type="date"
            min={today}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div>
          <label>Filtrar por serviço</label>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option>Todos</option>
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="confirmed-grid">
        {filteredConfirmedAppointments.length === 0 ? (
          <div className="confirmed-empty">
            <p>Nenhum agendamento confirmado encontrado.</p>
            <small>Altere os filtros ou confirme uma solicitação.</small>
          </div>
        ) : (
          filteredConfirmedAppointments.map((item) => (
            <div className="confirmed-item" key={item.id}>
              <div className="confirmed-item-header">
                <div>
                  <h4>{item.nomeCliente}</h4>
                  <p>{item.telefone}</p>
                </div>

                <span>Confirmado</span>
              </div>

              <div className="confirmed-info">
                <p>
                  <Car size={16} /> {item.veiculo}
                </p>
                <p>
                  <Droplet size={16} /> Cor: {item.cor}
                </p>
                <p>
                  <Wrench size={16} /> {item.servico}
                </p>
                <p>
                  <CalendarDays size={16} /> {item.data} às {item.horario}
                </p>
              </div>

              <div className="confirmed-actions">
                <button
  className="action-btn"
  onClick={() => {
    const telefone = item.telefone.replace(/\D/g, "");

    const mensagem = encodeURIComponent(
      `Olá ${item.nomeCliente},

Seu agendamento foi confirmado.

Serviço: ${item.servico}
Data: ${item.data}
Horário: ${item.horario}

AutoBrilho Polimentos`
    );

    window.open(
      `https://wa.me/55${telefone}?text=${mensagem}`,
      "_blank"
    );
  }}
>
  <MessageCircle size={16} />
  Enviar WhatsApp
</button>
                <button
                  className="action-btn"
                  onClick={() => updateAppointmentStatus(item.id, "Concluído")}
                >
                  Concluir serviço
                </button>

                <button
                  className="action-btn"
                  onClick={() => deleteAppointment(item.id)}
                >
                  <Trash2 size={16} />
                  Remover agendamento
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ConfirmedAppointments;