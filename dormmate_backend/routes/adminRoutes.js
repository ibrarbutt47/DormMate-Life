// import express from 'express';
// import { getAllUsers, getAllProperties, deleteUser, deleteProperty,approveProperty, rejectProperty } from '../controllers/adminController.js';
// import { verifyAdmin } from '../middleware/authMiddleware.js';
// import { getAllReviews } from '../controllers/adminController.js';


// const router = express.Router();

// router.get('/users', verifyAdmin, getAllUsers);
// router.get('/properties', verifyAdmin, getAllProperties);
// router.delete('/users/:id', verifyAdmin, deleteUser);
// router.delete('/properties/:id', verifyAdmin, deleteProperty);
// router.put('/properties/:id/approve', verifyAdmin, approveProperty);
// router.put('/properties/:id/reject', verifyAdmin, rejectProperty);
// router.get('/reviews', verifyToken, isAdmin, getAllReviews);

// export default router;










import express from 'express';
import {
  getAllUsers,
  getAllProperties,
  deleteUser,
  deleteProperty,
  approveProperty,
  rejectProperty,
  getAllReviews
} from '../controllers/adminController.js';

import { verifyAdmin } from '../middleware/authMiddleware.js'; // ✅ This checks both token and admin

const router = express.Router();

// Routes secured for admin
router.get('/users', verifyAdmin, getAllUsers);
router.get('/properties', verifyAdmin, getAllProperties);
router.delete('/users/:id', verifyAdmin, deleteUser);
router.delete('/properties/:id', verifyAdmin, deleteProperty);
router.put('/properties/:id/approve', verifyAdmin, approveProperty);
router.put('/properties/:id/reject', verifyAdmin, rejectProperty);
router.get('/reviews', verifyAdmin, getAllReviews); // ✅ Fixed line

export default router;
