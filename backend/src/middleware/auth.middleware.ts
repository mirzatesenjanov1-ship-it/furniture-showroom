import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: string;
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(401).json({ message: 'Авторизация талап кылынат' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret-key-32-chars-minimum'
    ) as JwtPayload;

    if (decoded.role !== 'ADMIN' && decoded.role !== 'SUPERADMIN') {
      return res.status(403).json({ message: 'Кирүүгө уруксат берилген эмес' });
    }

    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Сессия аяктады же токен ката' });
  }
};
