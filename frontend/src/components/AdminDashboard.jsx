function AdminDashboard({ appointments }) {
  const total = appointments.length;
  const pending = appointments.filter((item) => item.status === "Pendente").length;
  const confirmed = appointments.filter((item) => item.status === "Confirmado").length;
  const completed = appointments.filter((item) => item.status === "Concluído").length;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-card">
        <p>Total</p>
        <strong>{total}</strong>
      </div>

      <div className="dashboard-card">
        <p>Pendentes</p>
        <strong>{pending}</strong>
      </div>

      <div className="dashboard-card">
        <p>Confirmados</p>
        <strong>{confirmed}</strong>
      </div>

      <div className="dashboard-card">
        <p>Concluídos</p>
        <strong>{completed}</strong>
      </div>
    </div>
  );
}

export default AdminDashboard;