import { prisma } from "../db/connection.ts";

interface CreateAppointments {
  nome: string;
  servico: string;
  data: string;
  hora: string;
}

interface UpdateAppointments {
  id: string;
  nome?: string;
  servico?: string;
  data?: string;
  hora?: string;
}

interface UpdateStatusInterface {
  id: string;
}

interface DeleteAppointments {
  id: string;
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

export async function getRepoConcludedAppoin() {
  try {
    const concludedAppoin = await prisma.agendamento.findMany({
      where: {
        stats: true,
      },
    });
    if (!concludedAppoin) return false;
    return concludedAppoin;
  } catch (error) {
    return error;
  }
}

export async function getRepoNotConcludedAppoin() {
  try {
    const concludedAppoin = await prisma.agendamento.findMany({
      where: {
        stats: false,
      },
    });

    if (!concludedAppoin) return false;

    return concludedAppoin;
  } catch (error) {
    return error;
  }
}

export async function updateStatusRepo(id: string) {
  try {
    const exists = await prisma.agendamento.findUnique({
      where: {
        id,
      },
    });

    if (!exists) return;

    const newStats = !exists.stats;

    const update = await prisma.agendamento.update({
      where: {
        id,
      },
      data: {
        stats: newStats,
      },
    });
    return true;
  } catch (error) {
    return error;
  }
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
