"use client";

import { Trash } from "lucide-react";
import { deleteAgdm } from "@/actions/delete_agdm";
import { toast } from "sonner";

type Inpute = {
  id: string;
  func: () => Promise<void>
};

const del = async (id: string) => await deleteAgdm(id);

const DeleteButton = ({ id, func }: Inpute) => {
  return (
    <Trash
      size={18}
      className="cursor-pointer"
      onClick={async () => {
        await del(id);
        toast.warning('Agendamento deletado com sucesso.')
        func()
      }}
    />
  );
};

export default DeleteButton;
