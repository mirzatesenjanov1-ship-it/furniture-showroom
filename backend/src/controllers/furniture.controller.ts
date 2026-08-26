import { Request, Response, NextFunction } from 'express';
import { PrismaClient, FurnitureStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const getPublicFurniture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, minPrice, maxPrice, page = '1', limit = '12' } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      status: FurnitureStatus.PUBLISHED
    };

    if (category) {
      where.category = { slug: category as string };
    }

    if (search) {
      const query = search as string;
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { material: { contains: query, mode: 'insensitive' } },
        { color: { contains: query, mode: 'insensitive' } }
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    const [items, total] = await Promise.all([
      prisma.furniture.findMany({
        where,
        include: {
          category: true,
          images: { orderBy: { sortOrder: 'asc' } }
        },
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.furniture.count({ where })
    ]);

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getFurnitureBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const item = await prisma.furniture.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } }
      }
    });

    if (!item || item.status === FurnitureStatus.DRAFT) {
      return res.status(404).json({ message: 'Мебель табылган жок' });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminFurniture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await prisma.furniture.findMany({
      include: {
        category: true,
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const createFurniture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, slug, price, dimensions, material, color, description, categoryId, images, status, sku } = req.body;

    const newItem = await prisma.furniture.create({
      data: {
        title,
        slug,
        price,
        dimensions,
        material,
        color,
        description,
        categoryId,
        status: status || FurnitureStatus.DRAFT,
        sku: sku || `SKU-${Date.now()}`,
        images: {
          create: images?.map((img: { url: string; isCover?: boolean }, idx: number) => ({
            url: img.url,
            isCover: img.isCover || idx === 0,
            sortOrder: idx
          }))
        }
      },
      include: { images: true, category: true }
    });

    return res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

export const updateFurniture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.furniture.update({
      where: { id },
      data,
      include: { images: true, category: true }
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteFurniture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.furniture.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Мебель өчүрүлдү' });
  } catch (error) {
    next(error);
  }
};
