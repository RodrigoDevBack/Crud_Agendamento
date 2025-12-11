"use server";

import { Update } from "./interfaces/appointment";

export async function updateAgdm(data: Update) {
    const body: {[Key: string]: string} = {
        "id": data.id
    }
    if (data.data) {
        body["data"] = data.data
    }
    if (data.hora) {
        body["hora"] = data.hora
    }
    if (data.nome) {
        body["nome"] = data.nome
    }
    if (data.servico) {
        body["servico"] = data.servico
    }

  const request = await fetch("http://localhost:3001/agendamentos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (request.status != 204) return false;

  return true;
}
