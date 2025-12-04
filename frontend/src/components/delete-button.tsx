"use client";

import { Trash } from "lucide-react";
import { deleteAgdm } from "@/actions/delete_agdm";

type Inpute = {
  id: number;
};

const del = async (id: number) => await deleteAgdm(id);

const DeleteButton = ({ id }: Inpute) => {
  return (
    <Trash
      size={18}
      className="cursor-pointer"
      onClick={async () => {
        await del(id);
        globalThis.location.reload();
      }}
    />
  );
};

export default DeleteButton;
