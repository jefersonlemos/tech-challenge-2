import express from "express";
import UserController from "@/controllers/userController.js";
import authMiddleware from "@/middleware/authMiddleware.js";

const routes = express.Router();

routes
  .get("/users", authMiddleware, UserController.listarUsers)
  .get("/users/search", authMiddleware, UserController.listarUsersPorPalavrasChave)
  .get("/users/search/:q", authMiddleware, UserController.listarUsersPorPalavrasChave)
  .get("/users/:id", authMiddleware, UserController.listarUsersPorId)
  .post("/users", authMiddleware, UserController.cadastrarUser)
  .put("/users/:id", authMiddleware, UserController.atualizarUser)
  .delete("/users/:id", authMiddleware, UserController.excluirUser);

export default routes;
