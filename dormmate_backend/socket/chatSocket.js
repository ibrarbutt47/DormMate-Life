// import { saveMessage } from '../models/chatModel.js';

// const users = new Map();

// export const setupSocket = (io) => {
//   io.on('connection', (socket) => {
//     console.log('🟢 Connected:', socket.id);

//     socket.on('register', (userId) => {
//       users.set(userId, socket.id);
//       console.log(`Registered user ${userId}`);
//     });

//     socket.on('send_message', async ({ senderId, receiverId, message }) => {
//       try {
//         await saveMessage(senderId, receiverId, message);
//         const receiverSocketId = users.get(receiverId);
//         if (receiverSocketId) {
//           io.to(receiverSocketId).emit('receive_message', {
//             senderId,
//             message,
//             timestamp: new Date(),
//           });
//         }
//       } catch (err) {
//         console.error('❌ Error sending message:', err);
//       }
//     });

//     socket.on('disconnect', () => {
//       for (const [uid, sid] of users.entries()) {
//         if (sid === socket.id) {
//           users.delete(uid);
//           break;
//         }
//       }
//       console.log('🔴 Disconnected:', socket.id);
//     });
//   });
// };










import { saveMessage } from '../models/chatModel.js';

const users = new Map();

export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Connected:', socket.id);

    socket.on('register', (userId) => {
      users.set(userId, socket.id);
      console.log(`Registered user ${userId}`);
    });

    socket.on('send_message', async ({ senderId, receiverId, message }) => {
      try {
        console.log(`📥 Message received: ${senderId} -> ${receiverId}: "${message}"`);
        await saveMessage(senderId, receiverId, message);
        console.log(`✅ Message saved to DB`);

        const receiverSocketId = users.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', {
            senderId,
            receiverId,
            message,
            timestamp: new Date(),
          });
          console.log(`📤 Message sent to ${receiverSocketId}`);
        }
      } catch (err) {
        console.error('❌ Error sending message:', err);
      }
    });

    socket.on('disconnect', () => {
      for (const [uid, sid] of users.entries()) {
        if (sid === socket.id) {
          users.delete(uid);
          break;
        }
      }
      console.log('🔴 Disconnected:', socket.id);
    });
  });
};
