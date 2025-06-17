import jwt from "jsonwebtoken";
import User from "@/models/User.js";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "segredo123";

class UserController {
  // Define your user-related methods here
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ message: "Usuário criado com sucesso", user });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
      }
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  }

  static async listarUsers(req: Request, res: Response): Promise<void> {
    try {
      if (req.user?.role !== "teacher") {
        res.status(403).json({ message: "Acesso negado. Apenas professores podem acessar usuários." });
        return;
      }
      const users = await User.find({}, "-password"); // Exclude password from response
      if (!users || users.length === 0) {
        res.status(404).json({ message: "Nenhum usuário encontrado." });
        return;
      }

      res.status(200).json(users);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: "Erro ao listar usuários", error: err.message });
      }
    }
  }

  static async listarUsersPorId(req: Request, res: Response): Promise<void> {
    try {
      if (req.user?.role !== "teacher" && req.user?.id !== req.params.id) {
        // Only teachers can access this endpoint, or the user can access their own data
        res.status(403).json({ message: "Acesso negado. Apenas professores podem acessar usuários." });
        return;
      }
      const userId = req.params.id;
      const user = await User.findById(userId, "-password"); // Exclude password from response

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: "Erro ao buscar usuário", error: err.message });
      }
    }
  }

  static async listarUsersPorPalavrasChave(req: Request, res: Response): Promise<void> {
    try {
      if (req.user?.role !== "teacher") {
        res.status(403).json({ message: "Acesso negado. Apenas professores podem acessar usuários." });
        return;
      }
      const palavraChave = req.params.q as string || req.query.q as string || "";
      const users = await User.find(
        {
          $or: [
            { email: { $regex: palavraChave, $options: "i" } },
            { role: { $regex: palavraChave, $options: "i" } },
          ],
        },
        "-password",
      );
      if (users.length === 0) {
        res.status(404).json({ message: "Nenhum usuário encontrado com as palavras-chave fornecidas." });
        return;
      }

      res.status(200).json(users);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: "Erro ao buscar usuários", error: err.message });
      }
    }
  }

  static async cadastrarUser(req: Request, res: Response): Promise<void> {
    const newUser = req.body;
    try {
      if (req.user?.role !== "teacher") {
        res.status(403).json({ message: "Acesso negado. Apenas professores podem criar usuários." });
        return;
      }
      const userCompleto = { ...newUser };
      const userCriado = await User.create(userCompleto);
      res.status(201).json({ message: "Usuário criado com sucesso!", userCriado });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: "Falha ao cadastrar novo usuário.", error: err.message });
      }
    }
  }

  static async atualizarUser(req: Request, res: Response): Promise<void> {
    try {
      if (req.user?.role !== "teacher") {
        res.status(403).json({ message: "Acesso negado. Apenas professores podem atualizar usuários." });
        return;
      }
      const userId = req.params.id;
      const updatedData = req.body;
      const user = await User.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true, runValidators: true, fields: "-password" },
      );
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }
      res.status(200).json({ message: "Usuário atualizado com sucesso!", user: user });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: "Falha ao atualizar usuário", error: err.message });
      }
    }
  }

  static async excluirUser(req: Request, res: Response): Promise<void> {
    try {
      if (req.user?.role !== "teacher") {
        res.status(403).json({ message: "Acesso negado. Apenas professores podem excluir usuários." });
        return;
      }
      const userId = req.params.id;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      res.status(200).json({ message: "Usuário excluído com sucesso!" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: "Falha ao excluir usuário", error: err.message });
      }
    }
  }
}

export default UserController;
