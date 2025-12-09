"use server";

export async function getAgdmNotConcluded() {
  const request = await fetch("http://localhost:3001/agendamentos/not_concluded", {
    method: "GET",
  });

  const response = await request.json();

  return response;
}
