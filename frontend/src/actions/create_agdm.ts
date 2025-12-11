"use server";

import { Create } from "./interfaces/appointment";

export async function createAgdm(data: Create) {
  const body = {
    nome: data.nome,
    servico: data.servico,
    data: data.data,
    hora: data.hora,
  };

  const request = await fetch("http://localhost:3001/agendamentos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (request.status != 201) return false;

  return true;
}
