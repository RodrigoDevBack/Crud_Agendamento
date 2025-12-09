"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormEvent, useState } from "react";
import { createAgdm } from "@/actions/create_agdm";
import { CreateAgdm } from "../actions/interfaces/create_agdm";

import { toast } from "sonner";

type Input = {
  func: () => Promise<void>
}

const CreateAgdmDialog = ({ func }: Input) => {
  const [hora, setHora] = useState("");
  const [minuto, setMinuto] = useState("");
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");

  const createAg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datesd: CreateAgdm = {
      nome: nome,
      servico: servico,
      data: data,
      hora: hora + ":" + minuto,
    };
    const request = await createAgdm(datesd);
    toast.success('Agendamento criado com sucesso!')
    setData('')
    setNome('')
    setHora('')
    setMinuto('')
    setServico('')
    func()
    return request
  };

  // Permite apenas números
  const validateHora = (e: React.FormEvent<HTMLInputElement>) => {
    const entrada = e.currentTarget.value;
    let filtrado = entrada.replaceAll(/[^0-9]/g, "");
    if (Number.parseInt(entrada) > 23) {
      filtrado = "23";
    }
    setHora(filtrado);
  };

  const validateMinuto = (e: React.FormEvent<HTMLInputElement>) => {
    const entrada = e.currentTarget.value;
    let filtrado = entrada.replaceAll(/[^0-9]/g, "");
    if (Number.parseInt(entrada) > 59) {
      filtrado = "59";
    }
    setMinuto(filtrado);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer md:text-lg text-xs">
          <Plus />
          Cadastrar Novo Agendamento
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Agendamento</DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => createAg(e)}>
          <Label htmlFor="nome" className="text-lg">
            Nome:
          </Label>{" "}
          <br />
          <Input
            value={nome}
            onInput={(e) => setNome(e.currentTarget.value)}
            id="nome"
            placeholder="ex: Rodrigo Moraes"
            required
          />
          <br /> <br />
          <Label htmlFor="servico" className="text-lg">
            Serviço
          </Label>{" "}
          <br />
          <Input
            value={servico}
            onInput={(e) => setServico(e.currentTarget.value)}
            id="servico"
            placeholder="ex: Cortar cabelo"
            required
          />
          <br /> <br />
          <Label htmlFor="data" className="text-lg">
            Data
          </Label>{" "}
          <br />
          <Input
            value={data}
            onInput={(e) => setData(e.currentTarget.value)}
            type="date"
            id="data"
            required
          />
          <br /> <br />
          <Label className="text-lg">Horário</Label> <br />
          <div className="flex items-center gap-2">
            <Input
              className="w-16 text-center"
              type="text"
              value={hora}
              onInput={validateHora}
              maxLength={2}
              placeholder="00"
              required
            />
            <span className="text-2xl">:</span>
            <Input
              className="w-16 text-center"
              type="text"
              value={minuto}
              onInput={validateMinuto}
              maxLength={2}
              placeholder="00"
              required
            />
          </div>
          <br /> <br />
          <Button className="cursor-pointer" type="submit">
            Agendar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgdmDialog;
