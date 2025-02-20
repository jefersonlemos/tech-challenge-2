import express from "express";
import PostController from "../controllers/postController";

const routes = express.Router();

routes
  .get("/posts", PostController.listarPosts)
  .get("/posts/search", PostController.listarPostsPorPalavrasChave)
  .get("/posts/:id", PostController.listarPostPorId)
  .post("/posts", PostController.cadastrarPost)
  .put("/posts/:id", PostController.atualizarPost)
  .delete("/posts/:id", PostController.excluirPost);

export default routes;
