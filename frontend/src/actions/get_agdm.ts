"use server";

export async function getAgdm() {
  const request = await fetch("http://localhost:3001/agendamentos/", {
    method: "GET",
  });

  const response = await request.json();

  return response;
}
