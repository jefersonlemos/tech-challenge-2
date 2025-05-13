import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "segredo123";

class UserController {
    // Define your user-related methods here
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(201).json({ message: "Usuário criado com sucesso" });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            res.status(401).json({ message: "Credenciais inválidas" });
            return;
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ token });
    }
}

export default UserController;