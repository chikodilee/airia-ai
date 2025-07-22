import React, { useState } from 'react';
import { Send, Mic, Image } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '../../context/ChatContext';

interface UserInputProps {
  disabled?: boolean;
  placeholder?: string;
}

const UserInput: React.FC<UserInputProps> = ({
  disabled = false,
  placeholder = 'Type your message...',
}) => {
  const [message, setMessage] = useState('');
  const { sendUserMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    sendUserMessage(message);
    setMessage('');
  };

  return (
    <motion.form
      className="mx-auto max-w-3xl"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          className="input w-full pl-4 pr-24 py-3"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
        />
        
        <div className="absolute right-2 flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100"
            disabled={disabled}
          >
            <Image className="h-5 w-5" />
          </button>
          
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100"
            disabled={disabled}
          >
            <Mic className="h-5 w-5" />
          </button>
          
          <button
            type="submit"
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              message.trim() === '' || disabled
                ? 'bg-neutral-200 text-neutral-500'
                : 'bg-primary text-white'
            } transition-colors`}
            disabled={message.trim() === '' || disabled}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default UserInput;