// import express from 'express';
// import { submitPreferences, getPotentialMatches, getAllPreferences, checkUserPreferences } from '../controllers/roommateController.js';
// import auth from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/preferences', auth, submitPreferences);
// router.get('/matches', auth, getPotentialMatches);
// router.get('/all', getAllPreferences);
// router.get('/preferences/check', auth, async (req, res) => {    try {
//         const preference = await getUserPreference(req.user.id);
//         if (preference) {
//             return res.status(200).json({ submitted: true });
//         } else {
//             return res.status(200).json({ submitted: false });
//         }
//     } catch (error) {
//         console.error("Error checking preferences:", error);
//         res.status(500).json({ message: 'Error checking preferences' });
//     }
// });
// router.get('/preferences/check', auth, checkUserPreferences);


// export default router;











// import express from 'express';
// import verifyToken from '../middleware/authMiddleware.js';
// import {
//   submitPreferences,
//   getPotentialMatches,
//   getAllPreferences,
//   checkUserPreferences,
//   getMyPreferences
// } from '../controllers/roommateController.js';

// const router = express.Router();

// // Submit preferences
// router.post('/preferences', verifyToken, submitPreferences);

// // Get potential matches
// router.get('/matches', verifyToken, getPotentialMatches);

// // Get all preferences (public or admin)
// router.get('/all', getAllPreferences);

// // Check if user has already submitted preferences
// router.get('/preferences/check', verifyToken, checkUserPreferences);

// // ✅ Get preferences of the currently logged-in user
// router.get('/me', verifyToken, getMyPreferences);

// export default router;










import * as roommateController from '../controllers/roommateController.js';

import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Get current logged-in user's roommate preferences
router.get('/me', verifyToken, roommateController.getMyPreferences);

// ✅ Check if the current user has submitted preferences
router.get('/check', verifyToken, roommateController.checkUserPreferences);

// ✅ Submit or update roommate preferences
router.post('/submit', verifyToken, roommateController.submitPreferences);

// ✅ Get roommate match suggestions based on current user
router.get('/matches', verifyToken, roommateController.getPotentialMatches);

// ✅ Get all preferences (admin or debugging purpose)
router.get('/all', roommateController.getAllPreferences);

export default router;
