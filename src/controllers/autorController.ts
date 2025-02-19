import { Request, Response } from "express";
import { autor } from "../models/Autor.js";

class AutorController {

  static async listarAutores(req: Request, res: Response) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na requisição` });
      } else {
        res.status(500).json({ message: "falha na requisição" });
      }
    }
  }

  static async listarAutorPorId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      res.status(200).json(autorEncontrado);
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na requisição do autor` });
      } else {
        res.status(500).json({ message: "falha na requisição do autor" });
      }
    }
  }

  static async cadastrarAutor(req: Request, res: Response) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso!", autor: novoAutor });
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha ao cadastrar autor` });
      } else {
        res.status(500).json({ message: "falha ao cadastrar autor" });
      }
    }
  }

  static async atualizarAutor(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado" });
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na atualização` });
      } else {
        res.status(500).json({ message: "falha na atualização" });
      }
    }
  }

  static async excluirAutor(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        res.status(500).json({ message: `${erro.message} - falha na exclusão` });
      } else {
        res.status(500).json({ message: "falha na exclusão" });
      }
    }
  }

};

export default AutorController;
