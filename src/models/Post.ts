import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    conteudo: { type: String },
    autor: { type: String },
  },
  {
    timestamps: {
      createdAt: "criado_em",
      updatedAt: "atualizado_em",
    },
  versionKey: false,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
