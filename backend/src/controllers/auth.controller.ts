import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email жана сыр сөз талап кылынат' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Идентификация катасы. Маалымат туура эмес.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Идентификация катасы. Маалымат туура эмес.' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-key-32-chars-minimum',
      { expiresIn: '8h' }
    );

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000
    });

    await prisma.auditLog.create({
      data: {
        action: 'ADMIN_LOGIN_SUCCESS',
        ipAddress: req.ip || 'unknown',
        userId: user.id
      }
    });

    return res.status(200).json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

export const adminLogout = async (req: Request, res: Response) => {
  res.clearCookie('admin_token');
  return res.status(200).json({ success: true, message: 'Сессия аяктады' });
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true }
    });
    if (!user) return res.status(404).json({ message: 'Колдонуучу табылган жок' });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
