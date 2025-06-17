import { Request, Response } from "express";
import Post from "@/models/Post.js";

class PostController {

  static async listarPosts(req: Request, res: Response): Promise<void> {
    try {
      const listaPosts = await Post.find({});
      if (!listaPosts || listaPosts.length === 0) {
        res.status(404).json({ message: "Nenhum post encontrado." });
        return;
      }

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
        return;
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

      if (posts.length === 0) {
        res.status(404).json({ message: "Nenhum post encontrado com as palavras-chave fornecidas." });
        return;
      }

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
      if (req.user?.role !== "teacher") {
        res.status(403).json({ message: "Acesso negado. Apenas professores podem criar posts." });
        return;
      }
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
      if (req.user?.role !== "teacher") {
        res.status(403).json({ message: "Acesso negado. Apenas professores podem atualizar posts." });
        return;
      }
      const id = req.params.id;
      const postEditado = await Post.findByIdAndUpdate(id, req.body, { new: true });

      if (!postEditado) {
        res.status(404).json({ message: "Post não encontrado." });
        return;
      }

      res.status(200).json({ message: "Post atualizado.", post: postEditado });
    } catch (erro) {
      if (erro instanceof Error) {
        res.status(500).json({ message: "Falha na atualização do post." });
      }
    }
  }

  static async excluirPost(req: Request, res: Response): Promise<void> {
    try {
      if (req.user?.role !== "teacher") {
        res.status(403).json({ message: "Acesso negado. Apenas professores podem excluir posts." });
        return;
      }
      const id = req.params.id;
      const postEncontrado = await Post.findById(id);

      if (!postEncontrado) {
        res.status(404).json({ message: "Post não encontrado." });
        return;
      }
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
