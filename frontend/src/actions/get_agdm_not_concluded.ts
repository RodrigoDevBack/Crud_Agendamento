"use server";

export async function getAgdmNotConcluded() {
  const request = await fetch(
    "http://localhost:3001/agendamentos/not_concluded",
    {
      method: "GET",
    }
  );

  if (request.status != 200) return [];

  const response = await request.json();

  return response;
}
