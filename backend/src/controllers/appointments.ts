import type { Request, Response } from "express";

import type {
  Create,
  UpdateStatus,
  Delete,
  Update,
} from "../interfaces/appointments.ts";

import { Repository } from "../repository/appointments.ts";

export class AppointmentRoutes {
  /**
   * Cria o agendamento
   *
   * @param req requisita dados de acordo com a interface Create
   * @returns http response 201 | 400
   */
  static async create(req: Request<{}, any, Create>, res: Response) {
    try {
      const result = await Repository.create(req.body);
      if (!result) {
        return res.status(400).json("falha ao tentar criar agendamento.");
      }
      return res.status(201).json(req.body);
    } catch (error) {
      throw res.status(400).json("Falha na requisição. Erro: " + error);
    }
  }

  /**
   * Busca os Agendamentos não concluídos, ou seja, com stats = false
   *
   * @returns http status 200: Promise<Appointment[]> | 404: Sem agendamentos | 400
   */
  static async get(req: Request, res: Response) {
    try {
      const response = await Repository.get();
      if (!response) {
        return res.status(404).json("Sem agendamentos");
      }
      return res.status(200).json(response);
    } catch (error) {
      throw res.status(500).json("Falha na requisição. Erro: " + error);
    }
  }

  /**
   * Busca os Agendamentos concluídos, ou seja, com stats = true
   *
   * @returns http status 200: Promise<Appointment[]> | 404: Sem agendamentos | 400
   */
  static async getConcluded(req: Request, res: Response) {
    try {
      const response = await Repository.getConcluded();
      if (!response) {
        return res.status(404).json("Sem agendamentos");
      }
      return res.status(200).json(response);
    } catch (error) {
      throw res.status(400).json("Falha na requisição. Erro: " + error);
    }
  }

  /**
   * Busca os Agendamentos não concluídos, ou seja, com stats = false
   *
   * @returns http status 200: Promise<Appointment[]> | 404: Sem agendamentos | 400
   */
  static async getNotConcluded(req: Request, res: Response) {
    try {
      const response = await Repository.getNotConcluded();
      if (!response) {
        return res.status(404).json("Sem agendamentos");
      }
      return res.status(200).json(response);
    } catch (error) {
      throw res.status(400).json("Falha na requisição. Erro: " + error);
    }
  }

  /**
   * Atualiza um Agendamento pelo seu ID, se existir.
   *
   * @remarks Existe campos Opcionais, o ID é obrigatório.
   *
   * @param req requisita dados de acordo com a interface Update
   * @returns http status 204 | 404 | 400
   */
  static async update(req: Request<{}, any, Update>, res: Response) {
    try {
      const response = await Repository.update(req.body);
      if (!response) {
        return res.status(404).json("Falha ao tentar atualizar agendamento");
      }
      return res.status(204);
    } catch (error) {
      throw res.status(400).json("Falha na requisição. Erro: " + error);
    }
  }

  /**
   * Atualiza o status de um Agendamento pelo ID respectivo, se existir.
   *
   * @param req requisita dados de acordo com a interface Delete
   * @returns http response 204 | 400
   */
  static async updateStatus(
    req: Request<{}, any, UpdateStatus>,
    res: Response
  ) {
    try {
      const response = await Repository.updateStatus(req.body);
      if (!response) {
        return res.status(400).json("falha ao tentar atualizar agendamento.");
      }
      return res.status(204);
    } catch (error) {
      throw res.status(400).json("Falha na requisição. Erro: " + error);
    }
  }

  /**
   * Deleta um agendamento através do ID, se existir.
   *
   * @param req requisita de acordo com a interface Delete
   * @returns http response 204 | 400
   */
  static async delete(req: Request<{}, any, Delete>, res: Response) {
    try {
      const response = await Repository.delete(req.body);
      if (!response) {
        return res.status(400).json("falha ao tentar apagar agendamento.");
      }
      return res.status(204);
    } catch (error) {
      throw res.status(400).json("Falha na requisição. Erro: " + error);
    }
  }
}
