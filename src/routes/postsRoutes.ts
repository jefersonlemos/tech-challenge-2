import express from "express";
import PostController from "../controllers/postController.js";

const routes = express.Router();

routes
  .get("/posts", PostController.listarPosts)
  .get("/posts/:id", PostController.listarPostPorId)
  .get("/posts/search", PostController.listarPostsPorPalavrasChave)
  .post("/posts", PostController.cadastrarPost)
  .put("/posts/:id", PostController.atualizarPost)
  .delete("/posts/:id", PostController.excluirPost);

export default routes;
