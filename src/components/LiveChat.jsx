import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiHeadphones } from 'react-icons/fi';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to The Number. How can I help you today?", sender: "bot", time: new Date() }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user", time: new Date() }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for reaching out to The Number support! Our team will get back to you shortly.", 
        sender: "bot", 
        time: new Date() 
      }]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-4 md:right-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-2xl z-50 hover:shadow-xl transition-all duration-300"
      >
        <FiHeadphones className="text-2xl" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:right-8 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold">The Number Support</h3>
                <p className="text-xs opacity-90">Online • Usually replies in minutes</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <FiX />
              </button>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-white'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-xs opacity-70 mt-1 block ${msg.sender === 'user' ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t dark:border-gray-700 p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
              />
              <button onClick={sendMessage} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300">
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;