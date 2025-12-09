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

type Inpute = {
  totalAgdm: number
}

const DeleteAlert = ({totalAgdm}:Inpute) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-xs h-7 cursor-pointer" variant="outline">
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
          <AlertDialogAction className="cursor-pointer" >Sim</AlertDialogAction>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
