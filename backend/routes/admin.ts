import express, { Request, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

// POST: /api/admin/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email жана пароль талап кылынат' });
    }

    // 1. Колдонуучуну корголгон PostgreSQL базасынан табуу
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return res.status(401).json({ message: 'Логин же пароль туура эмес' });
    }

    // 2. Колдонуучунун ролу ADMIN экенин текшерүү
    if (user.role !== Role.ADMIN) {
      return res.status(403).json({ message: 'Кирүүгө уруксат берилген эмес' });
    }

    // 3. Базадагы хештелген пароль менен салыштыруу
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Логин же пароль туура эмес' });
    }

    // 4. JWT Токен генерациялоо
    const jwtSecret = process.env.JWT_SECRET || 'super_secret_jwt_key_2026';
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      }, 
      jwtSecret, 
      { expiresIn: '24h' }
    );

    // 5. Жыйынтыкты кайтаруу (пароль кайтарылбайт!)
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: 'Админ панелге ийгиликтүү кирдиңиз',
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Сервердик ката катталды' });
  }
});

export default router;
