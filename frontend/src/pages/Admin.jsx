import { useState } from "react";
import Header from "../components/Header";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";
import AppointmentsTable from "../components/AppointmentsTable";
import ConfirmedAppointments from "../components/ConfirmedAppointments";

function Admin({
  setCurrentPage,
  appointments,
  updateAppointmentStatus,
  deleteAppointment,
  isDarkMode,
  toggleDarkMode,
}) {
  const [isLogged, setIsLogged] = useState(false);

  if (!isLogged) {
    return (
      <>
        <Header
          setCurrentPage={setCurrentPage}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <AdminLogin onLogin={() => setIsLogged(true)} />
      </>
    );
  }

  return (
    <>
      <Header
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div
        style={{
          maxWidth: "1152px",
          margin: "40px auto",
          padding: "0 16px",
        }}
      >
        <h1>Painel Administrativo</h1>

        <p
          style={{
            marginTop: "8px",
            marginBottom: "24px",
            color: "#78716c",
          }}
        >
          Gerencie os agendamentos da oficina.
        </p>

        <AdminDashboard appointments={appointments} />

        <AppointmentsTable
          appointments={appointments}
          updateAppointmentStatus={updateAppointmentStatus}
          deleteAppointment={deleteAppointment}
        />

        <ConfirmedAppointments
          appointments={appointments}
          updateAppointmentStatus={updateAppointmentStatus}
          deleteAppointment={deleteAppointment}
        />
      </div>
    </>
  );
}

export default Admin;