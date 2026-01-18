// import express from 'express';
// import { fetchChat } from '../controllers/chatController.js';
// import auth from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/history/:otherUserId', auth, fetchChat);

// export default router;











// import express from 'express';
// import { fetchChat } from '../controllers/chatController.js';
// import auth from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/history/:otherUserId', auth, fetchChat);

// export default router;














import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { fetchChat, sendMessageDirect } from '../controllers/chatController.js';

const router = Router();

router.get('/history/:otherUserId', auth, fetchChat);
router.post('/send', auth, sendMessageDirect); // 👈 this is the API

export default router;
