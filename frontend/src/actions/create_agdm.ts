"use server";

import { CreateAgdm } from "./interfaces/create_agdm";

export async function createAgdm(data: CreateAgdm) {
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

  const response = await request.json();

  return response;
}
