import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const postSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    conteudo: { type: String },
    autor: autorSchema,
    dataCriacao: { type: String },
  },
  { versionKey: false },
);

const post = mongoose.model("posts", postSchema);

export default post;
