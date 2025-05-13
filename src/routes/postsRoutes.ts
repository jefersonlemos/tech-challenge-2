import express from "express";
import PostController from "@/controllers/postController";
import authMiddleware from "../middleware/authMiddleware";

const routes = express.Router();

routes
  .get("/posts", PostController.listarPosts)
  .get("/posts/search", PostController.listarPostsPorPalavrasChave)
  .get("/posts/search/:q", PostController.listarPostsPorPalavrasChave)
  .get("/posts/:id", PostController.listarPostPorId)
  .post("/posts", authMiddleware, PostController.cadastrarPost)
  .put("/posts/:id", authMiddleware, PostController.atualizarPost)
  .delete("/posts/:id", authMiddleware, PostController.excluirPost);

export default routes;
