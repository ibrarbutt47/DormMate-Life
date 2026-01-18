import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import {
  bookProperty,
  fetchOwnerBookings,
  approveBooking,
  declineBooking,
  fetchMyBookings,
  submitRating,
  fetchPropertyRatings
} from '../controllers/bookingController.js';

const router = express.Router();

// Booking routes
router.post('/book', verifyToken, bookProperty);
router.get('/owner', verifyToken, fetchOwnerBookings);
router.put('/confirm/:bookingId', verifyToken, approveBooking);
router.put('/reject/:bookingId', verifyToken, declineBooking);
router.get('/my', verifyToken, fetchMyBookings);

// Ratings routes
router.post('/rate', verifyToken, submitRating);
router.get('/ratings/:propertyId', fetchPropertyRatings);

export default router;
