import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  adminId?: string;
}

export const verifyAdminToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Кирүүгө уруксат жок! Токен табылган жок.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY') as { id: string };
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Сайтка кирүү мөөнөтү бүттү же токен ката.' });
  }
};
