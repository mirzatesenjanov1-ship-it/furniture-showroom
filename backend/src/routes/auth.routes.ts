import { Router } from 'express';
import { adminLogin, adminLogout, getMe } from '../controllers/auth.controller';
import { requireAdmin } from '../middleware/auth.middleware';
import rateLimit from 'express-rate-limit';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { message: 'Көп жолу туура эмес киргизилди. 15 мүнөттөн кийин кайра аракет кылыңыз.' }
});

router.post('/login', loginLimiter, adminLogin);
router.post('/logout', adminLogout);
router.get('/me', requireAdmin, getMe);

export default router;
