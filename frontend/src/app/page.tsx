"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [control, setControl] = useState<number>(0);

  const setSessionControl = (value: number) => {
    sessionStorage.setItem("control", value.toString());
    setControl(value);
  };

  useEffect(() => {
    const agdms = async () => {
      const agdm = await getAgdm();

      if (!agdm) return;

      return setTaskList(agdm);
    };

    agdms();
    const setContro = () => {
      const contro = sessionStorage.getItem("control") || "1";
      setControl(parseInt(contro));
    };
    setContro();
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
            <Badge
              variant={control === 0 ? "default" : "outline"}
              className={ control !== 0 ? "cursor-pointer hover:bg-gray-200" : "cursor-pointer"}
              onClick={() => setSessionControl(0)}
            >
              <List /> Todos
            </Badge>
            <Badge
              variant={control === 1 ? "default" : "outline"}
              className={ control !== 1 ? "cursor-pointer hover:bg-gray-200" : "cursor-pointer"}
              onClick={() => setSessionControl(1)}
            >
              <CircleAlert /> Não finalizados
            </Badge>
            <Badge
              variant={control === 2 ? "default" : "outline"}
              className={ control !== 2 ? "cursor-pointer hover:bg-gray-200" : "cursor-pointer"}
              onClick={() => setSessionControl(2)}
            >
              <CircleCheckBig /> Concluídos
            </Badge>
          </div>

          <div className="mt-4 border-b-2">
            {taskList.map((task) => (
              <div
                className="h-14 flex justify-between items-center border-t-2"
                key={task.id}
              >
                <div className={"w-1 h-full bg-green-300"}></div>

                <div className="flex-1 justify-between cursor-pointer hover:bg-gray-200 h-full">
                  <div className="flex justify-between h-full items-center">
                    <p className=" px-2 text-sm">{task.nome}</p>

                    <p className=" px-2 text-sm">{task.servico}</p>
                    <div className="flex justify-between">
                      <p className="px-3 text-sm">
                        {task.data} {task.hora}
                      </p>
                    </div>
                  </div>
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
              <p className="text-xs"> Agendamentos concluídos (3/3)</p>
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
            <p className="text-xs">{taskList.length} Agendamentos ao todo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
