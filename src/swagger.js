import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Configurações do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog Escola Pública",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/*"], // Caminho para onde estão documentadas suas rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default function swaggerSetup(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
