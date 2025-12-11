"use server";

export async function deleteAgdm(data: string) {
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

  if (request.status != 204) return false;

  return true;
}
