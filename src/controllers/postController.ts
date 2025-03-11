import { Request, Response } from "express";
import Post from "@/models/Post";

class PostController {

  static async listarPosts(req: Request, res: Response): Promise<void> {
    try {
      const listaPosts = await Post.find({});
      res.status(200).json(listaPosts);
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: "Falha na requisição dos posts." });
      }
    }
  }

  static async listarPostPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const postEncontrado = await Post.findById(id);

      if (!postEncontrado) {
        res.status(404).json({ message: "Post não encontrado." });
      }

      res.status(200).json(postEncontrado);
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(404).json({ message: "Falha na requisição do post." });
      }
    }
  }

  static async listarPostsPorPalavrasChave(req: Request, res: Response): Promise<void> {
    try {
      const palavrasChave = req.params.q as string || req.query.q as string || "";
      const posts = await Post.find({
        $or: [{ titulo: new RegExp(palavrasChave, "i") }, { conteudo: new RegExp(palavrasChave, "i") }, { autor: new RegExp(palavrasChave, "i") }],
      });

      res.status(200).json(posts);
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: "Falha na busca." });
      }
    }
  }

  static async cadastrarPost(req: Request, res: Response): Promise<void> {
    const novoPost = req.body;
    try {
      const postCompleto = { ...novoPost };
      const postCriado = await Post.create(postCompleto);
      res.status(201).json({ message: "Post criado com sucesso!", post: postCriado });
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: "Falha ao cadastrar novo post." });
      }
    }
  }

  static async atualizarPost(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const postEditado = await Post.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: "Post atualizado.", post: postEditado });
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: "Falha na atualização do post." });
      }
    }
  }

  static async excluirPost(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "Post excluído com sucesso." });
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: "Falha na exclusão do post." });
      }
    }
  }
};

export default PostController;
