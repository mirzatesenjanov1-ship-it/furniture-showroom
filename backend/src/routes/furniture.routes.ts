import { Router } from 'express';
import {
  getPublicFurniture,
  getFurnitureBySlug,
  createFurniture,
  updateFurniture,
  deleteFurniture,
  getAllAdminFurniture
} from '../controllers/furniture.controller';
import { requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/', getPublicFurniture);
router.get('/:slug', getFurnitureBySlug);

// Protected Admin Routes
router.get('/admin/all', requireAdmin, getAllAdminFurniture);
router.post('/', requireAdmin, createFurniture);
router.put('/:id', requireAdmin, updateFurniture);
router.delete('/:id', requireAdmin, deleteFurniture);

export default router;
