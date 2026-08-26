import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: 'global_settings' }
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 'global_settings',
          whatsappNumber: '996706035765',
          companyName: 'Мебель Шоурум'
        }
      });
    }

    return res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const updated = await prisma.settings.upsert({
      where: { id: 'global_settings' },
      update: data,
      create: { id: 'global_settings', ...data }
    });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
