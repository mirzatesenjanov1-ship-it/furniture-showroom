import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST: /api/admin/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const envEmail = process.env.ADMIN_EMAIL;
    const envPasswordHash = process.env.ADMIN_PASSWORD_HASH; 
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key';

    if (!envEmail || !envPasswordHash) {
      return res.status(500).json({ message: 'Серверде админ маалыматтары жөндөлгөн эмес.' });
    }

    if (email !== envEmail) {
      return res.status(401).json({ message: 'Логин же пароль ката!' });
    }

    const isMatch = await bcrypt.compare(password, envPasswordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Логин же пароль ката!' });
    }

    const token = jwt.sign({ role: 'ADMIN', email }, jwtSecret, { expiresIn: '24h' });

    return res.status(200).json({ token, message: 'Ийгиликтүү кирдиңиз' });
  } catch (error) {
    return res.status(500).json({ message: 'Сервердик ката катталды' });
  }
});

export default router;
