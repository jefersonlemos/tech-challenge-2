import express from "express";
import conectaNaDatabase from "@/config/dbConnect";
import routes from "@/routes/index";
import swaggerSetup from "./swagger.js";

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

async function startServer() {
  const conexao = await conectaNaDatabase();

  conexao.on("error", (erro: Error) => {
    console.error("erro de conexao", erro);
  });

  conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
  });

  swaggerSetup(app);
  routes(app);
}

startServer().catch((error) => {
  console.error("Falha ao iniciar server:", error);
});

export default app;
