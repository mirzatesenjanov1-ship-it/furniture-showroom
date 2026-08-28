import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { verifyAdminToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// 1. Админ Логин
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    return res.status(400).json({ message: 'Логин же пароль туура эмес!' });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Логин же пароль туура эмес!' });
  }

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || 'SECRET_KEY', { expiresIn: '8h' });
  res.json({ token, message: 'Ийгиликтүү кирдиңиз!' });
});

// 2. Жаңы эмерек кошуу (Жабык API маршрут)
router.post('/furniture', verifyAdminToken, async (req, res) => {
  const { title, description, price, imageUrl, category } = req.body;

  const newFurniture = await prisma.furniture.create({
    data: { title, description, price: parseFloat(price), imageUrl, category },
  });

  res.status(201).json(newFurniture);
});

// 3. Эмеректи өчүрүү (Жабык API маршрут)
router.delete('/furniture/:id', verifyAdminToken, async (req, res) => {
  const { id } = req.params;
  await prisma.furniture.delete({ where: { id } });
  res.json({ message: 'Эмерек өчүрүлдү.' });
});

export default router;
