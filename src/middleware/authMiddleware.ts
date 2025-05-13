import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Add this to extend the Request type
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
            };
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || "segredo123";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Token ausente" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Token inválido" });
        return;
    }
}
