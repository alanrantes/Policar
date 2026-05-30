const API_URL = "http://localhost:5004/api/agendamentos";

export async function getAppointments() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar agendamentos.");
  }

  return await response.json();
}

export async function createAppointment(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar agendamento.");
  }

  return await response.json();
}

export async function updateAppointmentStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}/status?status=${status}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar status.");
  }

  return await response.json();
}

export async function deleteAppointment(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir agendamento.");
  }
}