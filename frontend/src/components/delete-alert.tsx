"use client";

import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Get } from "@/actions/interfaces/appointment";
import { deleteAgdm } from "@/actions/delete_agdm";
import { toast } from "sonner";

type Inpute = {
  totalAgdm: number;
  agdms: Get[] | undefined;
  reload: () => Promise<void>;
};

const DeleteAlert = ({ totalAgdm, agdms, reload }: Inpute) => {
  const deleteAll = async () => {
    if (!agdms) return;
    agdms.map(async (agdm) => {
      await deleteAgdm(agdm.id);
    });
    await reload();
    toast.warning("Agendamentos deletados com êxito");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-xs h-7 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" variant="outline">
          <Trash /> Limpar todos os Agendamentos
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir {totalAgdm} itens?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => {
              deleteAll();
            }}
          >
            Sim
          </AlertDialogAction>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
