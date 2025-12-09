"use server";

export async function updateStatus(data: string) {
  const body = {
    id: data,
  };

  const request = await fetch("http://localhost:3001/agendamentos/status", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const response = await request.json();

  return response
}
