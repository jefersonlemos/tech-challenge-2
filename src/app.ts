import seedAdminUser from "./models/seedAdminUser";
import seedInitialPosts from "./models/seedInitialPosts.js"; 
import express from "express";
import conectaNaDatabase from "@/config/dbConnect.js";
import routes from "@/routes/index.js";
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

  conexao.once("open", async () => {
    console.log("Conexão com o banco feita com sucesso");
    await seedAdminUser();
    console.log("Usuário admin seed executado");
    await seedInitialPosts();
    console.log("Posts iniciais seed executados");
  });

  swaggerSetup(app);
  routes(app);
}

startServer().catch((error) => {
  console.error("Falha ao iniciar server:", error);
});

export default app;
