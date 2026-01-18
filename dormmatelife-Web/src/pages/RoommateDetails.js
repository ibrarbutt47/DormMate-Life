import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import socket from '../socket'; // ✅ use shared socket
import Navbar from '../components/Navbar';
import './RoommateDetails.css';

const RoommateDetails = () => {
  const { state } = useLocation();
  const { roommate } = state || {};
  const [showChat, setShowChat] = useState(() => localStorage.getItem('chatOpen') === 'true');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const senderId = currentUser?.id;
  const receiverId = roommate?.user_id;

  const toggleChat = (value) => {
    setShowChat(value);
    localStorage.setItem('chatOpen', value.toString());
  };

  // Scroll to bottom when new messages come
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Register socket user once
  useEffect(() => {
    if (senderId) {
      socket.emit('register', senderId);
    }
  }, [senderId]);

  // Fetch chat history on mount or when receiver changes
  useEffect(() => {
    if (!receiverId || !token) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/chat/history/${receiverId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setChatMessages(data);
      } catch (err) {
        console.error('❌ Error fetching chat history:', err);
      }
    };

    fetchHistory();
  }, [receiverId, token]);

  // Handle receiving messages in real-time
  useEffect(() => {
    const handleMessage = (data) => {
      const isCurrentChat =
        (data.senderId === receiverId && data.receiverId === senderId) ||
        (data.senderId === senderId && data.receiverId === receiverId);

      if (isCurrentChat) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender_id: data.senderId,
            receiver_id: data.receiverId,
            message: data.message,
            timestamp: data.timestamp,
          },
        ]);

        // Auto-open chat if user gets message
        if (!showChat && data.senderId === receiverId) {
          toggleChat(true);
        }
      }
    };

    socket.on('receive_message', handleMessage);

    return () => {
      socket.off('receive_message', handleMessage);
    };
  }, [receiverId, senderId, showChat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMsg = {
      sender_id: senderId,
      receiver_id: receiverId,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save to DB
      await fetch('http://localhost:5000/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId, message }),
      });

      // Emit via socket
      socket.emit('send_message', {
        senderId,
        receiverId,
        message,
        timestamp: newMsg.timestamp,
      });

      // Show in UI instantly
      setChatMessages((prev) => [...prev, newMsg]);
      setMessage('');
    } catch (err) {
      console.error('❌ Error sending message:', err);
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('chatOpen');
    };
  }, []);

  if (!roommate) return <p>Invalid roommate data.</p>;

  return (
    <>
      <Navbar />
      <div className="roommate-details-container">
        <div className="roommate-card">
          {roommate.profile_picture && (
            <img
              src={`http://localhost:5000/uploads/${roommate.profile_picture}`}
              alt={roommate.name}
              className="roommate-image"
            />
          )}
          <h2>{roommate.name}</h2>
          <p><strong>Email:</strong> {roommate.email}</p>
          <p><strong>Phone:</strong> {roommate.phone}</p>
          <p><strong>Role:</strong> {roommate.role}</p>
          <p><strong>Budget:</strong> Rs {roommate.budget}</p>
          <p><strong>Cleanliness:</strong> {roommate.cleanliness}</p>
          <p><strong>Sleeping Time:</strong> {roommate.sleeping_time}</p>
          <p><strong>Personality:</strong> {roommate.personality}</p>

          <button className="chat-btn" onClick={() => toggleChat(true)}>
            💬 Start Chat
          </button>
        </div>

        {showChat && (
          <div className="chat-window">
            <div className="chat-header">
              <span>Chat with {roommate.name}</span>
              <button onClick={() => toggleChat(false)}>✖</button>
            </div>
            <div className="chat-body">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.sender_id === senderId ? 'sent' : 'received'}`}
                >
                  <p>{msg.message}</p>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RoommateDetails;
