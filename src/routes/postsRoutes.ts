import express from "express";
import PostController from "@/controllers/postController.js";
import authMiddleware from "@/middleware/authMiddleware.js";

const routes = express.Router();

routes
  .get("/posts", authMiddleware, PostController.listarPosts)
  .get("/posts/search", authMiddleware, PostController.listarPostsPorPalavrasChave)
  .get("/posts/search/:q", authMiddleware, PostController.listarPostsPorPalavrasChave)
  .get("/posts/:id", authMiddleware, PostController.listarPostPorId)
  .post("/posts", authMiddleware, PostController.cadastrarPost)
  .put("/posts/:id", authMiddleware, PostController.atualizarPost)
  .delete("/posts/:id", authMiddleware, PostController.excluirPost);

export default routes;
