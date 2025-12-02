import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import EditTask from '../components/edit-task';
import DeleteAlert from '../components/delete-alert';

import {
  Plus,
  List,
  CircleAlert,
  CircleCheckBig,
  Trash,
  ClipboardCheck,
  Sigma,
} from "lucide-react";

function Home() {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-xl">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar Tarefa" />
          <Button className="cursor-pointer">
            <Plus />
            Cadastrar
          </Button>
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

          <div className="mt-4 border-b-1">
            <div className="h-14 flex justify-between items-center border-t-1">
              <div className="w-1 h-full bg-green-300"></div>

              <p className="flex-1 px-2 text-sm">Estudar React</p>

              <div className="flex items-center gap-2">
                <EditTask />
                <Trash size={18} className="cursor-pointer" />
              </div>
            </div>
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

        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default Home;
