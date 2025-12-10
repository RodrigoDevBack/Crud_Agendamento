import { prisma } from "../db/connection.ts";

import type {
  Create,
  Delete,
  Update,
  UpdateStatus,
  Appointment,
} from "../interfaces/appointments.ts";

export class Repository {
  /**
   * Cria o Agendamento no formato da interface Create
   *
   * @param data no formato da interface Create
   * @returns Appointment
   */
  static async create(data: Create): Promise<Appointment> {
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
      throw error;
    }
  }

  /**
   * Busca todos os Agendamentos
   *
   * @returns Appointment[] | undefined
   */
  static async get(): Promise<Appointment[] | undefined> {
    try {
      const allAppoin = await prisma.agendamento.findMany();

      if (!allAppoin) return;

      return allAppoin;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca todos os Agendamentos que estão com o stats igual a true
   *
   * @returns Appointment[] | undefined
   */
  static async getConcluded(): Promise<Appointment[] | undefined> {
    try {
      const concludedAppoin = await prisma.agendamento.findMany({
        where: {
          stats: true,
        },
        select: {
          id: true,
          nome: true,
          servico: true,
          stats: true,
          data: true,
          hora: true,
        },
      });
      if (!concludedAppoin) return;
      return concludedAppoin;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca todos os Agendamentos que estão com o stats igual a false
   *
   * @returns Appointment[] | undefined
   */
  static async getNotConcluded(): Promise<Appointment[] | undefined> {
    try {
      const concludedAppoin = await prisma.agendamento.findMany({
        where: {
          stats: false,
        },
        select: {
          id: true,
          nome: true,
          servico: true,
          stats: true,
          data: true,
          hora: true,
        },
      });

      if (!concludedAppoin) return;

      return concludedAppoin;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Atualiza um Agendamento pelo seu ID, se existir.
   *
   * @remarks Existe campos Opcionais, o ID é obrigatório.
   *
   * @param data no formato da interface Update
   * @returns true | undefined
   */
  static async update(data: Update): Promise<true | undefined> {
    try {
      const agdmExists = await prisma.agendamento.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!agdmExists) return;

      await prisma.agendamento.update({
        where: {
          id: data.id,
        },
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Atualiza o Status de uma agendamento, se existir, através do respectivo ID.
   *
   * @param id no formato da interface UpdateStatus
   * @returns true | undefined
   */
  static async updateStatus(id: UpdateStatus): Promise<true | undefined> {
    try {
      const exists = await prisma.agendamento.findUnique({
        where: {
          id: id.id,
        },
      });

      if (!exists) return;

      const newStats = !exists.stats;

      await prisma.agendamento.update({
        where: {
          id: id.id,
        },
        data: {
          stats: newStats,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deleta o Agendamento, se existir, através do respectivo ID.
   *
   * @param id  no formato da interface Delete
   * @returns true | undefined
   */
  static async delete(id: Delete): Promise<true | undefined> {
    try {
      const agdm = await prisma.agendamento.findUnique({
        where: {
          id: id.id,
        },
      });

      if (!agdm) return;

      await prisma.agendamento.delete({
        where: {
          id: id.id,
        },
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
