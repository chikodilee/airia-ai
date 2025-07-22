import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Option } from '../../types';

interface OptionButtonsProps {
  options: Option[];
  onOptionClick: (optionText: string) => void;
  multiSelect?: boolean;
}

const OptionButtons: React.FC<OptionButtonsProps> = ({
  options,
  onOptionClick,
  multiSelect = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionClick = (option: Option) => {
    if (multiSelect) {
      const isSelected = selectedOptions.includes(option.text);
      
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter((text) => text !== option.text));
      } else {
        setSelectedOptions([...selectedOptions, option.text]);
      }
    } else {
      onOptionClick(option.text);
    }
  };

  const handleSubmitMultiSelect = () => {
    if (selectedOptions.length === 0) return;
    onOptionClick(selectedOptions.join(', '));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(option.text);
          
          return (
            <motion.button
              key={index}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                multiSelect && isSelected
                  ? 'bg-primary text-white'
                  : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100'
              }`}
              onClick={() => handleOptionClick(option)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {option.text}
            </motion.button>
          );
        })}
      </div>
      
      {multiSelect && selectedOptions.length > 0 && (
        <motion.button
          className="btn btn-primary mt-2 self-start"
          onClick={handleSubmitMultiSelect}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Submit selection
        </motion.button>
      )}
    </div>
  );
};

export default OptionButtons;