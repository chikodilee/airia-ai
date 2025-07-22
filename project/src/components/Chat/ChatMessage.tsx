import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';
import type { Message } from '../../types';
import { useChat } from '../../context/ChatContext';
import OptionButtons from './OptionButtons';
import DateSelector from '../Booking/DateSelector';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { sendUserMessage } = useChat();
  
  // Handle clicking on options
  const handleOptionClick = (optionText: string) => {
    sendUserMessage(optionText);
  };

  return (
    <div className={`mb-6 flex ${message.sender === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      {message.sender === 'assistant' && (
        <div className="mr-3 mt-1 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <span className="text-sm font-semibold">A</span>
          </div>
        </div>
      )}
      
      <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
        <motion.div
          className={`chat-message ${
            message.sender === 'user' ? 'chat-message-user' : 'chat-message-assistant'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message.content}
        </motion.div>
        
        {/* Options (like buttons) */}
        {message.options?.options && (
          <div className="mt-2">
            <OptionButtons
              options={message.options.options}
              onOptionClick={handleOptionClick}
              multiSelect={message.options.multiSelect}
            />
          </div>
        )}
        
        {/* Date Selector for booking */}
        {message.options?.dateSelection && (
          <div className="mt-4">
            <DateSelector onSelect={(dates) => sendUserMessage(`I'd like to book from ${dates.start} to ${dates.end} for 2 guests.`)} />
          </div>
        )}
      </div>
      
      {message.sender === 'user' && (
        <div className="ml-3 mt-1 flex-shrink-0">
          <UserCircle className="h-8 w-8 text-neutral-400" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;