import type { Request, Response } from "express";

import {
  createRepoAppoin,
  getRepoAppoin,
  deleteRepoAppoin,
} from "../repository/appointments.ts";

interface createAppointments {
  nome: String;
  servico: String;
  data: String;
  hora: String;
}

interface updateAppointments {
  id: number;
  nome?: String;
  servico?: String;
  data?: String;
  hora?: String;
}

interface deleteAppointments {
  id: number;
}

export async function createAppoin(req: Request<{}, any, createAppointments>, res: Response) {
  try {
    const result = await createRepoAppoin(req.body);
    if (!result) {
      return res.status(400).json("falha ao tentar criar agendamento.");
    }
    return res.status(201).json(req.body);
  } catch (err){
    return res.status(400).json("Falha na requisição.");
  }
}

export async function getAppoin(req: Request, res: Response) {
  try {
    const response = await getRepoAppoin();
    if (!response) {
      return res.status(404).json("falha ao tentar criar agendamento.");
    }
    return res.status(200).json(response);
  } catch (err){
    return res.status(500).json("Falha na requisição.");
  }
}

export async function updateAppoin(req: Request<{}, any, updateAppointments>, res: Response) {
  try {
    return res.status(200).json("In development");
  } catch (err) {
    return res.status(400).json("Falha misteriosa");
  }
}

export async function deleteAppoin(req: Request<{}, any, deleteAppointments>, res: Response) {
  try {
    const response = deleteRepoAppoin(req.body);
    if (!response) {
      return res.status(400).json("falha ao tentar criar agendamento.");
    }
    return res.status(201).json(req.body);
  } catch (err){
    return res.status(400).json("Falha na requisição.");
  }
}
