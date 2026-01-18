// import {
//   createBooking,
//   createPayment,
//   getBookingsByOwner,
//   confirmBooking,
//   rejectBooking,
//   getBookingsByUser
// } from '../models/bookingModel.js';

// import {
//   addPropertyRating,
//   getPropertyRatings
// } from '../models/ratingModel.js';

// export const bookProperty = async (req, res) => {
//   const userId = req.user.id;
//   const { propertyId, startDate, endDate, numPersons, numRooms, amount, paymentMethod } = req.body;

//   if (!propertyId || !startDate || !endDate || !numPersons || !numRooms || !amount || !paymentMethod) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const bookingId = await createBooking(userId, propertyId, startDate, endDate, numPersons, numRooms);
//     const paymentId = await createPayment(bookingId, amount, paymentMethod);

//     res.status(201).json({
//       message: 'Booking and payment successful',
//       bookingId,
//       paymentId
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Booking or payment failed', error: err.message });
//   }
// };

// export const fetchOwnerBookings = async (req, res) => {
//   const ownerId = req.user.id;

//   try {
//     const bookings = await getBookingsByOwner(ownerId);
//     res.status(200).json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
//   }
// };

// export const approveBooking = async (req, res) => {
//   const { bookingId } = req.params;

//   try {
//     await confirmBooking(bookingId);
//     res.status(200).json({ message: 'Booking confirmed' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to confirm booking', error: err.message });
//   }
// };

// export const declineBooking = async (req, res) => {
//   const { bookingId } = req.params;

//   try {
//     await rejectBooking(bookingId);
//     res.status(200).json({ message: 'Booking rejected' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to reject booking', error: err.message });
//   }
// };

// export const fetchMyBookings = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const bookings = await getBookingsByUser(userId);
//     res.status(200).json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch your bookings', error: err.message });
//   }
// };

// // Submit a rating after confirmed booking
// export const submitRating = async (req, res) => {
//   const userId = req.user.id;
//   const { bookingId, rating, review } = req.body;

//   if (!bookingId || !rating) {
//     return res.status(400).json({ message: 'Booking ID and rating are required.' });
//   }

//   if (rating < 1 || rating > 5) {
//     return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
//   }

//   try {
//     const userBookings = await getBookingsByUser(userId);
//     const booking = userBookings.find(b => b.id === bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found or does not belong to user.' });
//     }

//     if (booking.booking_status !== 'confirmed') {
//       return res.status(400).json({ message: 'Only confirmed bookings can be rated.' });
//     }

//     await addPropertyRating(userId, booking.property_id, rating, review);
//     res.status(201).json({ message: 'Rating submitted successfully.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to submit rating.', error: err.message });
//   }
// };

// // Get all ratings for a property
// export const fetchPropertyRatings = async (req, res) => {
//   const { propertyId } = req.params;

//   try {
//     const ratings = await getPropertyRatings(propertyId);
//     res.status(200).json(ratings);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch ratings.', error: err.message });
//   }
// };
















// import {
//   createBooking,
//   createPayment,
//   getBookingsByOwner,
//   confirmBooking,
//   rejectBooking,
//   getBookingsByUser
// } from '../models/bookingModel.js';

// import {
//   addPropertyRating,
//   getPropertyRatings
// } from '../models/ratingModel.js';

// import db from '../config/db.js'; // Required for room availability logic

// export const bookProperty = async (req, res) => {
//   const userId = req.user.id;
//   const { propertyId, startDate, endDate, numPersons, numRooms, amount, paymentMethod } = req.body;

//   if (!propertyId || !startDate || !endDate || !numPersons || !numRooms || !amount || !paymentMethod) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Fetch property details
//     const [property] = await new Promise((resolve, reject) => {
//       db.query(`SELECT room_type, number_of_beds FROM properties WHERE id = ?`, [propertyId], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });

//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }

//     const { room_type, number_of_beds } = property;

//     if (room_type === 'shared') {
//       const [countResult] = await new Promise((resolve, reject) => {
//         db.query(
//           `SELECT COUNT(*) AS bookedBeds FROM bookings WHERE property_id = ? AND booking_status = 'confirmed'`,
//           [propertyId],
//           (err, result) => (err ? reject(err) : resolve(result))
//         );
//       });

//       const bookedBeds = countResult.bookedBeds;
//       const remainingBeds = number_of_beds - bookedBeds;

//       if (remainingBeds <= 0) {
//         return res.status(400).json({ message: 'No available beds in this shared room.' });
//       }

//     } else if (room_type === 'private') {
//       const [existing] = await new Promise((resolve, reject) => {
//         db.query(
//           `SELECT COUNT(*) AS booked FROM bookings WHERE property_id = ? AND booking_status = 'confirmed'`,
//           [propertyId],
//           (err, result) => (err ? reject(err) : resolve(result))
//         );
//       });

//       if (existing.booked > 0) {
//         return res.status(400).json({ message: 'This private room is already booked.' });
//       }
//     }

//     const bookingId = await createBooking(userId, propertyId, startDate, endDate, numPersons, numRooms);
//     const paymentId = await createPayment(bookingId, amount, paymentMethod);

//     res.status(201).json({
//       message: 'Booking and payment successful',
//       bookingId,
//       paymentId
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Booking or payment failed', error: err.message });
//   }
// };

// export const fetchOwnerBookings = async (req, res) => {
//   const ownerId = req.user.id;

//   try {
//     const bookings = await getBookingsByOwner(ownerId);
//     res.status(200).json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
//   }
// };

// export const approveBooking = async (req, res) => {
//   const { bookingId } = req.params;

//   try {
//     await confirmBooking(bookingId);
//     res.status(200).json({ message: 'Booking confirmed' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to confirm booking', error: err.message });
//   }
// };

// export const declineBooking = async (req, res) => {
//   const { bookingId } = req.params;

//   try {
//     await rejectBooking(bookingId);
//     res.status(200).json({ message: 'Booking rejected' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to reject booking', error: err.message });
//   }
// };

// export const fetchMyBookings = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const bookings = await getBookingsByUser(userId);
//     res.status(200).json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch your bookings', error: err.message });
//   }
// };

// export const submitRating = async (req, res) => {
//   const userId = req.user.id;
//   const { bookingId, rating, review } = req.body;

//   if (!bookingId || !rating) {
//     return res.status(400).json({ message: 'Booking ID and rating are required.' });
//   }

//   if (rating < 1 || rating > 5) {
//     return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
//   }

//   try {
//     const userBookings = await getBookingsByUser(userId);
//     const booking = userBookings.find(b => b.id === bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found or does not belong to user.' });
//     }

//     if (booking.booking_status !== 'confirmed') {
//       return res.status(400).json({ message: 'Only confirmed bookings can be rated.' });
//     }

//     await addPropertyRating(userId, booking.property_id, rating, review);
//     res.status(201).json({ message: 'Rating submitted successfully.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to submit rating.', error: err.message });
//   }
// };

// export const fetchPropertyRatings = async (req, res) => {
//   const { propertyId } = req.params;

//   try {
//     const ratings = await getPropertyRatings(propertyId);
//     res.status(200).json(ratings);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch ratings.', error: err.message });
//   }
// };



















import {
  createBooking,
  createPayment,
  getBookingsByOwner,
  confirmBooking,
  rejectBooking,
  getBookingsByUser
} from '../models/bookingModel.js';

import {
  addPropertyRating,
  getPropertyRatings
} from '../models/ratingModel.js';

import db from '../config/db.js';

// export const bookProperty = async (req, res) => {
//   const userId = req.user.id;
//   const { propertyId, startDate, endDate, numPersons, numRooms, amount, paymentMethod } = req.body;

//   if (!propertyId || !startDate || !endDate || !numPersons || !numRooms || !amount || !paymentMethod) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Fetch property details
//     const [property] = await new Promise((resolve, reject) => {
//       db.query(`SELECT room_type, number_of_beds FROM properties WHERE id = ?`, [propertyId], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });

//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }

//     const { room_type, number_of_beds } = property;

//     if (room_type === 'shared') {
//       const [countResult] = await new Promise((resolve, reject) => {
//         db.query(
//           `SELECT COUNT(*) AS bookedBeds 
//            FROM bookings 
//            WHERE property_id = ? AND booking_status = 'confirmed'
//              AND (start_date <= ? AND end_date >= ?)`,
//           [propertyId, endDate, startDate],
//           (err, result) => (err ? reject(err) : resolve(result))
//         );
//       });

//       const bookedBeds = countResult.bookedBeds;
//       const remainingBeds = number_of_beds - bookedBeds;

//       if (remainingBeds <= 0) {
//         return res.status(400).json({ message: 'No available beds in this shared room for the selected dates.' });
//       }

//     } else if (room_type === 'private') {
//       const [existing] = await new Promise((resolve, reject) => {
//         db.query(
//           `SELECT COUNT(*) AS booked 
//            FROM bookings 
//            WHERE property_id = ? AND booking_status = 'confirmed'
//              AND (start_date <= ? AND end_date >= ?)`,
//           [propertyId, endDate, startDate],
//           (err, result) => (err ? reject(err) : resolve(result))
//         );
//       });

//       if (existing.booked > 0) {
//         return res.status(400).json({ message: 'This private room is already booked for the selected dates.' });
//       }
//     }

//     const bookingId = await createBooking(userId, propertyId, startDate, endDate, numPersons, numRooms);
//     const paymentId = await createPayment(bookingId, amount, paymentMethod);

//     res.status(201).json({
//       message: 'Booking and payment successful',
//       bookingId,
//       paymentId
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Booking or payment failed', error: err.message });
//   }
// };


export const bookProperty = async (req, res) => {
  const userId = req.user.id;
  const {
    propertyId,
    startDate,
    endDate,
    numPersons,
    numRooms,
    amount,
    paymentMethod
  } = req.body;

  if (!propertyId || !startDate || !endDate || !numPersons || !numRooms || !amount || !paymentMethod) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // 1. Fetch room type and beds
    const [property] = await new Promise((resolve, reject) => {
      db.query(
        `SELECT room_type, number_of_beds FROM properties WHERE id = ?`,
        [propertyId],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    const { room_type, number_of_beds } = property;

    // 2. Prevent user from double booking same property in overlapping dates
    const [existingBooking] = await new Promise((resolve, reject) => {
      db.query(
        `SELECT id FROM bookings 
         WHERE user_id = ? AND property_id = ? 
           AND booking_status IN ('confirmed', 'pending')
           AND (start_date <= ? AND end_date >= ?)`,
        [userId, propertyId, endDate, startDate],
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });

    if (existingBooking) {
      return res.status(400).json({
        message: 'You already have a booking for this property during the selected dates.'
      });
    }

    // 3. Check availability
    if (room_type === 'shared') {
      // Use SUM(num_persons) to count actual beds booked
      const [countResult] = await new Promise((resolve, reject) => {
        db.query(
          `SELECT COALESCE(SUM(num_persons), 0) AS bookedBeds 
           FROM bookings 
           WHERE property_id = ? AND booking_status = 'confirmed'
             AND (start_date <= ? AND end_date >= ?)`,
          [propertyId, endDate, startDate],
          (err, result) => (err ? reject(err) : resolve(result))
        );
      });

      const bookedBeds = countResult.bookedBeds;
      const remainingBeds = number_of_beds - bookedBeds;

      if (numPersons > remainingBeds) {
        return res.status(400).json({
          message: `Only ${remainingBeds} bed(s) available in this shared room during the selected dates.`
        });
      }

    } else if (room_type === 'private') {
      // Private room can only be booked once in the date range
      const [existing] = await new Promise((resolve, reject) => {
        db.query(
          `SELECT COUNT(*) AS booked 
           FROM bookings 
           WHERE property_id = ? AND booking_status = 'confirmed'
             AND (start_date <= ? AND end_date >= ?)`,
          [propertyId, endDate, startDate],
          (err, result) => (err ? reject(err) : resolve(result))
        );
      });

      if (existing.booked > 0) {
        return res.status(400).json({
          message: 'This private room is already booked during the selected dates.'
        });
      }
    }

    // 4. Create booking and payment
    const bookingId = await createBooking(userId, propertyId, startDate, endDate, numPersons, numRooms);
    const paymentId = await createPayment(bookingId, amount, paymentMethod);

    res.status(201).json({
      message: 'Booking and payment successful',
      bookingId,
      paymentId
    });

  } catch (err) {
    res.status(500).json({
      message: 'Booking or payment failed',
      error: err.message
    });
  }
};

export const fetchOwnerBookings = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const bookings = await getBookingsByOwner(ownerId);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

export const approveBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    await confirmBooking(bookingId);
    res.status(200).json({ message: 'Booking confirmed' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to confirm booking', error: err.message });
  }
};

export const declineBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    await rejectBooking(bookingId);
    res.status(200).json({ message: 'Booking rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject booking', error: err.message });
  }
};

export const fetchMyBookings = async (req, res) => {
  const userId = req.user.id;

  try {
    const bookings = await getBookingsByUser(userId);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your bookings', error: err.message });
  }
};

export const submitRating = async (req, res) => {
  const userId = req.user.id;
  const { bookingId, rating, review } = req.body;

  if (!bookingId || !rating) {
    return res.status(400).json({ message: 'Booking ID and rating are required.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
  }

  try {
    const userBookings = await getBookingsByUser(userId);
    const booking = userBookings.find(b => b.id === bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or does not belong to user.' });
    }

    if (booking.booking_status !== 'confirmed') {
      return res.status(400).json({ message: 'Only confirmed bookings can be rated.' });
    }

    await addPropertyRating(userId, booking.property_id, rating, review);
    res.status(201).json({ message: 'Rating submitted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit rating.', error: err.message });
  }
};

export const fetchPropertyRatings = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const ratings = await getPropertyRatings(propertyId);
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch ratings.', error: err.message });
  }
};
