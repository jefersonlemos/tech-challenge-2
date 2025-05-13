import express, { Express, Response } from "express";
import posts from "./postsRoutes";
import auth from "./auth";
import cors from "cors";

const routes = (app: Express) => {
  app.route("/").get((_, res: Response) => {
    res.status(200).send({ titulo: "Blog Escola Pública" });
  });

  app.use(cors());
  app.use(express.json(), posts);
  app.use(express.json(), auth);
};

export default routes;
