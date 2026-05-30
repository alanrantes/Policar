import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Footer from "../components/Footer";
import AppointmentModal from "../components/AppointmentModal";

function Home({
  setCurrentPage,
  appointments,
  addAppointment,
  isDarkMode,
  toggleDarkMode,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddAppointment(newAppointment) {
    addAppointment(newAppointment);
    setIsModalOpen(false);
  }

  return (
    <>
      <Header
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <Services />
        <About />
      </main>

      <Footer />

      {isModalOpen && (
        <AppointmentModal
          appointments={appointments}
          onClose={() => setIsModalOpen(false)}
          onSubmitAppointment={handleAddAppointment}
        />
      )}
    </>
  );
}

export default Home;