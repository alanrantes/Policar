import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Toast from "./components/Toast";

import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus as updateAppointmentStatusApi,
  deleteAppointment as deleteAppointmentApi,
} from "./services/appointmentsService";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [appointments, setAppointments] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      showToast("Erro ao carregar agendamentos.");
      console.error(error);
    }
  }

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((current) => !current);
  }

  function showToast(message) {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  }

  async function addAppointment(newAppointment) {
    try {
      const createdAppointment = await createAppointment({
        nomeCliente: newAppointment.name,
        telefone: newAppointment.phone,
        veiculo: newAppointment.car,
        cor: newAppointment.color,
        servico: newAppointment.service,
        data: newAppointment.date,
        horario: newAppointment.time,
        status: "Pendente",
      });

      setAppointments((current) => [...current, createdAppointment]);

      showToast("Agendamento enviado com sucesso.");
    } catch (error) {
      showToast("Erro ao enviar agendamento.");
      console.error(error);
    }
  }

  async function updateAppointmentStatus(id, newStatus) {
    try {
      const updatedAppointment = await updateAppointmentStatusApi(
        id,
        newStatus
      );

      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === id ? updatedAppointment : appointment
        )
      );

      showToast(`Agendamento marcado como ${newStatus}.`);
    } catch (error) {
      showToast("Erro ao atualizar agendamento.");
      console.error(error);
    }
  }

  async function deleteAppointment(id) {
    try {
      await deleteAppointmentApi(id);

      setAppointments((current) =>
        current.filter((appointment) => appointment.id !== id)
      );

      showToast("Agendamento removido com sucesso.");
    } catch (error) {
      showToast("Erro ao remover agendamento.");
      console.error(error);
    }
  }

  return (
    <>
      {currentPage === "home" ? (
        <Home
          setCurrentPage={setCurrentPage}
          appointments={appointments}
          addAppointment={addAppointment}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ) : (
        <Admin
          setCurrentPage={setCurrentPage}
          appointments={appointments}
          updateAppointmentStatus={updateAppointmentStatus}
          deleteAppointment={deleteAppointment}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      <Toast message={toastMessage} />
    </>
  );
}

export default App;