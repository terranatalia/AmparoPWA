import express, { Application } from "express";
import cors from "cors";
import db from "./db/conn";

import PaisRoutes from "./routes/PaisRoutes";
import EstadoRoutes from "./routes/EstadoRoutes";
import CidadeRoutes from "./routes/CidadeRoutes";
import UsuarioRoutes from "./routes/UsuarioRoutes";
import UsuarioTipoRoutes from "./routes/UsuarioTipoRoutes";
import ContatoEmergenciaRoutes from "./routes/ContatoEmergenciaRoutes";
import LogadouroRoutes from "./routes/LogadouroRoutes";
import MensagemRoutes from "./routes/MensagemRoutes";
import AlertaRoutes from "./routes/AlertaRoutes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/pais", PaisRoutes);
app.use("/estado", EstadoRoutes);
app.use("/cidade", CidadeRoutes);
app.use("/logadouro", LogadouroRoutes);
app.use("/usuario", UsuarioRoutes);
app.use("/usuario-tipo", UsuarioTipoRoutes);
app.use("/contato-emergencia", ContatoEmergenciaRoutes);
app.use("/mensagem", MensagemRoutes);
app.use("/alerta", AlertaRoutes);

db.sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Servidor online na porta 5000!");
    });
  })
  .catch((err: Error) => console.log("Erro ao sincronizar", err));
