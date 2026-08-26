import { Router } from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/category.controller';
import { requireAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getCategories);
router.post('/', requireAdmin, createCategory);
router.delete('/:id', requireAdmin, deleteCategory);

export default router;
