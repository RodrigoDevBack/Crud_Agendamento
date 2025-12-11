"use client";

export interface Create {
  nome: string;
  servico: string;
  data: string;
  hora: string;
}

export interface Get {
  id: string;
  nome: string;
  servico: string;
  stats: boolean;
  data: string;
  hora: string;
}

export interface Update {
  id: string;
  nome?: string;
  servico?: string;
  data?: string;
  hora?: string;
}

export interface UpdateStatus {
  id: string;
}

export interface Delete {
  id: string;
}
