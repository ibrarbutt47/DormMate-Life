import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { addRating, getRatings } from '../controllers/ratingController.js';

const router = express.Router();

// Add or update a rating - user must be logged in
router.post('/add', verifyToken, addRating);

// Get ratings for a property - public
router.get('/:propertyId', getRatings);

export default router;
