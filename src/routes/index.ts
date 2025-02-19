import express, { Express, Response } from "express";
import posts from "./postsRoutes.js";
import autores from "./autoresRoutes.js";

const routes = (app: Express) => {
  app.route("/").get((_, res: Response) => {
    res.status(200).send({titulo: "Blog da Turma"});
  });

  app.use(express.json(), posts, autores);
};

export default routes;
