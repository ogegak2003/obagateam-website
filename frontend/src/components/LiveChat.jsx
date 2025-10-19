import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      addSystemMessage('Connected to support team');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      addSystemMessage('Disconnected from support');
    });

    newSocket.on('chat message', (msg) => {
      setMessages(prev => [...prev, { ...msg, id: Date.now() }]);
    });

    newSocket.on('user joined', (data) => {
      addSystemMessage(`${data.username} joined the chat`);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addSystemMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'system',
      timestamp: new Date().toLocaleTimeString(),
    }]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && socket && isConnected) {
      const message = {
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now(),
      };
      socket.emit('chat message', message);
      setMessages(prev => [...prev, message]);
      setInputMessage('');
    }
  };

  return (
    <>
      {/* Chat Widget */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl z-40 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        animate={{
          boxShadow: isConnected 
            ? '0 20px 25px -5px rgba(34, 197, 94, 0.3), 0 10px 10px -5px rgba(34, 197, 94, 0.2)'
            : '0 20px 25px -5px rgba(100, 116, 139, 0.3), 0 10px 10px -5px rgba(100, 116, 139, 0.2)'
        }}
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
            isConnected ? 'bg-green-400' : 'bg-gray-400'
          }`} />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="font-semibold">obagaTeam Support</h3>
                  <p className="text-primary-100 text-xs">{isConnected ? 'Online' : 'Connecting...'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-primary-200 transition-colors duration-200 p-1 rounded-lg hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <p className="font-medium text-gray-700">Welcome to obagaTeam Support!</p>
                  <p className="text-sm mt-1">How can we help you today?</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    {msg.sender === 'system' ? (
                      <div className="text-center">
                        <span className="inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {msg.text}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`inline-block px-4 py-2 rounded-2xl max-w-xs ${
                            msg.sender === 'user'
                              ? 'bg-primary-600 text-white rounded-br-none'
                              : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 px-2">
                          {msg.timestamp}
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={!isConnected}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || !isConnected}
                  className="bg-primary-600 text-white px-4 py-3 rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;