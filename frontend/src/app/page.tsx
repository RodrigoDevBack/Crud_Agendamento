"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import EditTask from "../components/edit-task";
import DeleteAlert from "../components/delete-alert";

import {
  List,
  CircleAlert,
  CircleCheckBig,
  ClipboardCheck,
  Sigma,
} from "lucide-react";
import { getAgdm } from "@/actions/get_agdm";
import { useEffect, useState } from "react";
import { GetAgdm } from "@/actions/interfaces/get_agdm";
import DeleteButton from "../components/delete-button";
import CreateAgdmDialog from "@/components/create-form-dialog";

function Home() {
  const [taskList, setTaskList] = useState<GetAgdm[]>([]);

  useEffect(() => {
    const agdms = async () => {
      const agdm = await getAgdm();

      if (!agdm) return;

      return setTaskList(agdm);
    };

    agdms();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-3xl">
        <CardHeader className="flex gap-2 justify-between items-center">
          <CardTitle className="md:text-2xl ">Agendamentos</CardTitle>
          <CreateAgdmDialog />
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2 items-center">
            <Badge variant="default" className="cursor-pointer">
              <List /> Todas
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <CircleAlert /> Não finalizadas
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              <CircleCheckBig /> Concluídas
            </Badge>
          </div>

          <div className="mt-4 border-b-2">
            {taskList.map((task) => (
              <div
                className="h-14 flex justify-between items-center border-t-2"
                key={task.id}
              >
                <div className="w-1 h-full bg-green-300"></div>
                <p className="flex-1 px-2 text-sm">{task.nome}</p>
                <p className="flex-2 px-2 text-sm">{task.servico}</p>

                <div className="flex justify-between">
                  <p className="px-2 text-sm">
                    {task.data} {task.hora}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <EditTask />
                  <DeleteButton id={task.id} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-7">
            <div className="flex gap-2 items-center">
              <ClipboardCheck size={18} />
              <p className="text-xs"> Tarefas Concluídas (3/3)</p>
            </div>

            <div>
              <DeleteAlert />
            </div>
          </div>
          <div className="h-2 w-full mt-4 bg-gray-200 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 Tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
