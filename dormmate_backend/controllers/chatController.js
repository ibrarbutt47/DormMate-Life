// import { saveMessage, getConversation } from '../models/chatModel.js';

// export const fetchChat = async (req, res) => {
//   const userId = req.user.id;
//   const { otherUserId } = req.params;

//   try {
//     const messages = await getConversation(userId, otherUserId);
//     res.status(200).json(messages);
//   } catch (err) {
//     console.error('❌ Error fetching chat:', err);
//     res.status(500).json({ message: 'Server error fetching chat history.' });
//   }
// };









// import { getConversation } from '../models/chatModel.js';

// export const fetchChat = async (req, res) => {
//   const userId = req.user.id;
//   const { otherUserId } = req.params;

//   try {
//     const messages = await getConversation(userId, otherUserId);
//     res.status(200).json(messages);
//   } catch (err) {
//     console.error('❌ Error fetching chat:', err);
//     res.status(500).json({ message: 'Server error fetching chat history.' });
//   }
// };













import { saveMessage, getConversation } from '../models/chatModel.js';

export const fetchChat = async (req, res) => {
  const userId = req.user.id;
  const { otherUserId } = req.params;

  try {
    const messages = await getConversation(userId, otherUserId);
    res.status(200).json(messages);
  } catch (err) {
    console.error('❌ Error fetching chat:', err);
    res.status(500).json({ message: 'Server error fetching chat history.' });
  }
};

export const sendMessageDirect = async (req, res) => {
  const senderId = req.user.id;
  const { receiverId, message } = req.body;

  if (!receiverId || !message) {
    return res.status(400).json({ message: 'Receiver ID and message are required.' });
  }

  try {
    await saveMessage(senderId, receiverId, message);
    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ message: 'Failed to send message.' });
  }
};
