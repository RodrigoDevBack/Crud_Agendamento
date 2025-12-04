"use server";

export async function deleteAgdm(data: number) {
  const body = {
    id: data,
  };

  const request = await fetch("http://localhost:3001/agendamentos/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const response = await request.json();

  return response;
}
