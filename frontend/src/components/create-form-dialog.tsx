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

import { toast } from "sonner";
import { Create } from "@/actions/interfaces/appointment";

type Input = {
  func: () => Promise<void>;
};

const CreateAgdmDialog = ({ func }: Input) => {
  const [hora, setHora] = useState("");
  const [minuto, setMinuto] = useState("");
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const hoje = new Date().toISOString().split("T");
  const limite = new Date();
  limite.setDate(limite.getDate() + 21);
  const limit = limite.toISOString().split("T");

  const createAg = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let horaForm = "0";
    let minutoForm = "0";
    if (hora.split("").length < 2) {
      horaForm += hora;
    } else {
      horaForm = hora;
    }
    if (minuto.split("").length < 2) {
      minutoForm += minuto;
    } else {
      minutoForm = minuto;
    }
    const datesd: Create = {
      nome: nome,
      servico: servico,
      data: data,
      hora: horaForm + ":" + minutoForm,
    };
    const request = await createAgdm(datesd);
    if (!request) return toast.error("A atualização falhou");
    toast.success("Agendamento criado com sucesso!");
    setData("");
    setNome("");
    setHora("");
    setMinuto("");
    setServico("");
    func();
    setOpen(false);
    return request;
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
        <Button className="cursor-pointer md:text-lg text-xs transition-transform duration-300 ease-in-out hover:scale-107">
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
            min={hoje[0]}
            max={limit[0]}
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
