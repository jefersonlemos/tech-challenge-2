import express, { Express, Response } from "express";
import posts from "./postsRoutes";

const routes = (app: Express) => {
  app.route("/").get((_, res: Response) => {
    res.status(200).send({ titulo: "Blog Escola Pública" });
  });

  app.use(express.json(), posts);
};

export default routes;
