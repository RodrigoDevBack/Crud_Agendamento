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
import { updateStatus } from "@/actions/update_status";
import { getAgdmNotConcluded } from "@/actions/get_agdm_not_concluded";
import { getAgdmConcluded } from "@/actions/get_agdm_concluded";

function Home() {
  const [taskList, setTaskList] = useState<GetAgdm[]>([]);
  const [control, setControl] = useState<number>(0);

  const setSessionControl = (value: number) => {
    sessionStorage.setItem("control", value.toString());
    setControl(value);
  };


  const agdms = async (contr = control) => {
    let agdm = await getAgdm();
    const control = contr;
    if (control == 1) {
      agdm = await getAgdmNotConcluded();
    } else if (control == 2) {
      agdm = await getAgdmConcluded();
    }

    if (!agdm) return;

    setTaskList(agdm);
  };

  useEffect(() => {
    const setContro = () => {
      const contro = sessionStorage.getItem("control") || "0";
      setControl(parseInt(contro));
      return contro;
    };
    const control = setContro();

    const agdms = async (control: string) => {
      let agdm = await getAgdm();

      if (control == "1") {
        agdm = await getAgdmNotConcluded();
      } else if (control == "2") {
        agdm = await getAgdmConcluded();
      }

      if (!agdm) return;

      setTaskList(agdm);
    };

    agdms(control);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-3xl">
        <CardHeader className="flex gap-2 justify-between items-center">
          <CardTitle className="md:text-2xl ">Agendamentos</CardTitle>
          <CreateAgdmDialog func={agdms} />
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2 items-center">
            <Badge
              variant={control === 0 ? "default" : "outline"}
              className={
                control !== 0
                  ? "cursor-pointer hover:bg-gray-200"
                  : "cursor-pointer"
              }
              onClick={async () => {
                await agdms(0);
                setSessionControl(0);
              }}
            >
              <List /> Todos
            </Badge>
            <Badge
              variant={control === 1 ? "default" : "outline"}
              className={
                control !== 1
                  ? "cursor-pointer hover:bg-gray-200"
                  : "cursor-pointer"
              }
              onClick={async () => {
                await agdms(1);
                setSessionControl(1);
              }}
            >
              <CircleAlert /> Não finalizados
            </Badge>
            <Badge
              variant={control === 2 ? "default" : "outline"}
              className={
                control !== 2
                  ? "cursor-pointer hover:bg-gray-200"
                  : "cursor-pointer"
              }
              onClick={async () => {
                await agdms(2);
                setSessionControl(2);
              }}
            >
              <CircleCheckBig /> Concluídos
            </Badge>
          </div>

          <div className="mt-4 border-b-2">
            {Array.isArray(taskList)
              ? taskList.map((task) => (
                  <div
                    className="h-14 flex justify-between items-center border-t-2"
                    key={task.id}
                  >
                    <div
                      className={
                        task.stats == true
                          ? "w-1 h-full bg-green-500"
                          : "w-1 h-full bg-red-500"
                      }
                    ></div>

                    <div
                      className="flex-1 justify-between cursor-pointer hover:bg-gray-200 h-full"
                      onClick={async () => {
                        await updateStatus(task.id);
                        await agdms();
                      }}
                    >
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
                      <DeleteButton id={task.id} func={agdms} />
                    </div>
                  </div>
                ))
              : ""}
          </div>

          <div className="flex justify-between mt-7">
            <div className="flex gap-2 items-center">
              <ClipboardCheck size={18} />
              <p className="text-xs"> Agendamentos concluídos {taskList.length > 0 ? ((taskList.filter(task => task.stats == true)).length/taskList.length) : 0}</p>
            </div>

            <div>
              <DeleteAlert totalAgdm={taskList.length} />
            </div>
          </div>
          <div className="h-2 w-full mt-4 bg-gray-200 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={ {width: `${taskList.length > 0 ? ((taskList.filter(task => task.stats == true)).length / taskList.length) * 100 : 0}%`}}
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
