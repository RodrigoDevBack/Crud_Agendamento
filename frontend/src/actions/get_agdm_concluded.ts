"use server";

export async function getAgdmConcluded() {
  const request = await fetch("http://localhost:3001/agendamentos/concluded", {
    method: "GET",
  });

  const response = await request.json();

  return response;
}
