import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    conteudo: { type: String },
    autor: { type: String },
    data: { trim: true, type: Date, default: Date.now },
  },
  { versionKey: false },
);

const post = mongoose.model("posts", postSchema);

export default post;
