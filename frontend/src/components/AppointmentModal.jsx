import { useState } from "react";
import { services } from "../data/services";

const availableTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

function AppointmentModal({ appointments, onClose, onSubmitAppointment }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    car: "",
    color: "",
    service: "Polimento automotivo",
    date: "",
    time: "",
  });

  function onlyNumbers(value) {
    return value.replace(/\D/g, "");
  }

  function formatPhone(value) {
    const numbers = onlyNumbers(value).slice(0, 11);

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }

  const bookedTimes = appointments
    .filter(
      (item) =>
        item.date === formData.date &&
        item.status === "Confirmado"
    )
    .map((item) => item.time);

  const availableTimesForDate = availableTimes.filter(
    (time) => !bookedTimes.includes(time)
  );

  function handleSubmit() {
    onSubmitAppointment(formData);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h2>Agendamento online</h2>
            <p>Preencha os dados para solicitar um horário.</p>
          </div>

          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="appointment-form">
          <input
            placeholder="Nome do cliente"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            placeholder="(00) 0000-0000"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: formatPhone(e.target.value),
              })
            }
          />

          <input
            placeholder="Modelo do carro"
            value={formData.car}
            onChange={(e) =>
              setFormData({ ...formData, car: e.target.value })
            }
          />

          <input
            placeholder="Cor do carro"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
          />

          <select
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
          >
            {services.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>

          <input
            type="date"
            min={today}
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
                time: "",
              })
            }
          />

          <select
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
          >
            <option value="">Selecione um horário</option>

            {availableTimesForDate.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-orange form-button"
            onClick={handleSubmit}
          >
            Enviar agendamento
          </button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;