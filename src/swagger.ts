import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { Express } from "express";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Configurações do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog da Turma",
      version: "0.0.0",
      description: "Documentação da API usando Swagger",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./dist/routes/api-docs.js"], // Caminho para onde estão documentadas suas rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default function swaggerSetup(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
