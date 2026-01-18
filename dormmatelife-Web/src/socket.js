// src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // replace with actual backend URL if needed
export default socket;
