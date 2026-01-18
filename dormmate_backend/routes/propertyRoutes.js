import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import propertyController from '../controllers/propertyController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post(
  '/list',
  verifyToken,
  upload.array('images', 5),
  propertyController.createProperty
);

router.get('/my-properties', verifyToken, propertyController.getPropertiesByOwner);
router.get('/', propertyController.getAllProperties);
router.get('/search', propertyController.getFilteredProperties);
router.get('/nearby', propertyController.getNearbyProperties);

export default router;
