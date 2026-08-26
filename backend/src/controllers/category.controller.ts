import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { furniture: true } } },
      orderBy: { name: 'asc' }
    });
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug, description } = req.body;
    const category = await prisma.category.create({
      data: { name, slug, description }
    });
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Категория өчүрүлдү' });
  } catch (error) {
    next(error);
  }
};
