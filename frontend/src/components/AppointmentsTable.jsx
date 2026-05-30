import { useState } from "react";
import { Search, Trash2 } from "lucide-react";

function AppointmentsTable({
  appointments,
  updateAppointmentStatus,
  deleteAppointment,
}) {
  const [search, setSearch] = useState("");

  const filteredAppointments = appointments.filter((item) => {
    const text = `
      ${item.nomeCliente}
      ${item.telefone}
      ${item.veiculo}
      ${item.cor}
      ${item.servico}
      ${item.data}
      ${item.horario}
      ${item.status}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  function getStatusClass(status) {
    switch (status) {
      case "Confirmado":
        return "status-confirmed";

      case "Concluído":
        return "status-completed";

      case "Cancelado":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  }

  return (
    <div className="appointments-table-card">
      <div className="appointments-table-header">
        <div>
          <h3>Solicitações recebidas</h3>
          <p>Agendamentos enviados pelo site.</p>
        </div>

        <div className="appointments-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar agendamento"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Telefone</th>
              <th>Carro</th>
              <th>Cor</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-table">
                  Nenhum agendamento recebido.
                </td>
              </tr>
            ) : filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="9" className="empty-table">
                  Nenhum resultado encontrado.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((item) => (
                <tr key={item.id}>
                  <td>{item.nomeCliente}</td>
                  <td>{item.telefone}</td>
                  <td>{item.veiculo}</td>
                  <td>{item.cor}</td>
                  <td>{item.servico}</td>
                  <td>{item.data}</td>
                  <td>{item.horario}</td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="action-btn"
                        onClick={() =>
                          updateAppointmentStatus(item.id, "Confirmado")
                        }
                      >
                        Confirmar
                      </button>

                      <button
                        className="action-btn"
                        onClick={() =>
                          updateAppointmentStatus(item.id, "Cancelado")
                        }
                      >
                        Cancelar
                      </button>

                      <button
                        className="action-btn icon-action-btn"
                        onClick={() => deleteAppointment(item.id)}
                        title="Excluir agendamento"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentsTable;