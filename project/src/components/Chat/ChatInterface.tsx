import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../context/ChatContext';
import ChatMessage from './ChatMessage';
import UserInput from './UserInput';
import ListingList from '../Listings/ListingList';

const ChatInterface: React.FC = () => {
  const { messages, isTyping, activeListings, conversationStage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage message={message} />
                
                {/* Show listings if included in message options */}
                {message.sender === 'assistant' && message.options?.listings && (
                  <div className="my-4">
                    <ListingList listings={message.options.listings} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              className="chat-message chat-message-assistant inline-block animate-pulse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-neutral-200 p-4 md:p-6">
        <UserInput
          disabled={isTyping || conversationStage === 'complete'}
          placeholder={
            conversationStage === 'complete'
              ? 'Booking completed! Start a new conversation?'
              : 'Type your message...'
          }
        />
      </div>
    </div>
  );
};

export default ChatInterface;