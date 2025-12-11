"use client";

import { SquarePen } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { Get, Update } from "@/actions/interfaces/appointment";
import { updateAgdm } from "@/actions/update_agdm";
import { toast } from "sonner";
import { Label } from "./ui/label";

type Input = {
  func: () => Promise<void>;
  agdm: Get;
};

const EditTask = ({ func, agdm }: Input) => {
  const [hora, setHora] = useState(agdm.hora.charAt(0) + agdm.hora.charAt(1));
  const [minuto, setMinuto] = useState(
    agdm.hora.charAt(3) + agdm.hora.charAt(4)
  );
  const [nome, setNome] = useState(agdm.nome);
  const [servico, setServico] = useState(agdm.servico);
  const [data, setData] = useState(agdm.data);
  const [open, setOpen] = useState(false);
  const hoje = new Date().toISOString().split("T");
  const limite = new Date();
  limite.setDate(limite.getDate() + 21);
  const limit = limite.toISOString().split("T");

  const updateAg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let horaForm = "0"
    let minutoForm = "0"
    if (hora.split('').length < 2) {
      horaForm += hora
    } else {
      horaForm = hora
    }
    if (minuto.split('').length < 2) {
      minutoForm += minuto
    } else {
      minutoForm = minuto
    }
    const body: Update = {
        "id": agdm.id
    }
    if (data != agdm.data) {
        body["data"] = data
    }
    if ((horaForm + ':' + minutoForm) != agdm.hora) {
        body["hora"] = (horaForm + ':' + minutoForm)
    }
    if (nome != agdm.nome) {
        body["nome"] = nome
    }
    if (servico != agdm.servico) {
        body["servico"] = servico
    }
    const request = await updateAgdm(body);
    if (!request) return toast.error('A atualização falhou')
    toast.success("Agendamento criado com sucesso!");
    func();
    setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SquarePen
          size={18}
          className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => updateAg(e)}>
          <Label htmlFor="nome" className="text-lg">
            Nome:
          </Label>{" "}
          <br />
          <Input
            value={nome}
            onInput={(e) => setNome(e.currentTarget.value)}
            id="nome"
            placeholder="ex: Rodrigo Moraes"
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
            min={hoje[0]}
            max={limit[0]}
            id="data"
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
            />
            <span className="text-2xl">:</span>
            <Input
              className="w-16 text-center"
              type="text"
              value={minuto}
              onInput={validateMinuto}
              maxLength={2}
              placeholder="00"
            />
          </div>
          <br /> <br />
          <Button className="cursor-pointer" type="submit">
            Editar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
