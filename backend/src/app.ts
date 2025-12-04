import express from "express";

import router from "./routes/router.ts";

const app = express();

app.use(express.json());

app.use("/agendamentos", router);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
