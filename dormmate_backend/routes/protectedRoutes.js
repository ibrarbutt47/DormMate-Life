import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route, only accessible if token is valid
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}! This is a protected route.` });
});

export default router;
