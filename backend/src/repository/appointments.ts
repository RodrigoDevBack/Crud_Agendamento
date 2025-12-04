import { prisma } from "../db/connection.ts";

interface CreateAppointments {
  nome: string;
  servico: string;
  data: string;
  hora: string;
}

interface UpdateAppointments {
  id: number;
  nome?: string;
  servico?: string;
  data?: string;
  hora?: string;
}

interface DeleteAppointments {
  id: number;
}

export async function createRepoAppoin(data: CreateAppointments) {
  try {
    const appointments = await prisma.agendamento.create({
      data: {
        nome: `${data.nome}`,
        servico: `${data.servico}`,
        data: `${data.data}`,
        hora: `${data.hora}`,
      },
    });
    return appointments;
  } catch (error) {
    return error;
  }
}

export async function getRepoAppoin() {
  try {
    const allAppoin = await prisma.agendamento.findMany();
    return allAppoin;
  } catch (error) {
    return error;
  }
}

// Futura implementação
export async function updateRepoAppoin(data: UpdateAppointments) {
  return true;
}

export async function deleteRepoAppoin(data: DeleteAppointments) {
  const id = data.id;
  try {
    const tesasd = await prisma.agendamento.findUnique({
      where: {
        id,
      },
    });
    if (tesasd) {
      await prisma.agendamento.delete({
        where: {
          id,
        },
      });
    }
    return true;
  } catch (error) {
    return error;
  }
}
