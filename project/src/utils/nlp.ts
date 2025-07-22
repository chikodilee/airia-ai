import { mockPOIs } from './mockData';
import type { POI } from '../types';

// Simple NLP function to extract location from text
export const extractLocationFromText = (text: string): POI | null => {
  const lowerText = text.toLowerCase();
  
  // Simulate NLP by checking for known locations in the text
  for (const poi of mockPOIs) {
    if (lowerText.includes(poi.name.toLowerCase()) || lowerText.includes(poi.city.toLowerCase())) {
      return poi;
    }
  }
  
  // If no exact match, try to extract common tourist landmarks
  if (lowerText.includes('eiffel') || lowerText.includes('tower')) {
    return mockPOIs[0]; // Eiffel Tower
  }
  
  if (lowerText.includes('louvre') || lowerText.includes('museum')) {
    return mockPOIs[1]; // Louvre
  }
  
  if (lowerText.includes('notre') || lowerText.includes('dame') || lowerText.includes('cathedral')) {
    return mockPOIs[2]; // Notre Dame
  }
  
  if (lowerText.includes('times') || lowerText.includes('square')) {
    return mockPOIs[3]; // Times Square
  }
  
  if (lowerText.includes('central') || lowerText.includes('park')) {
    return mockPOIs[4]; // Central Park
  }
  
  // If we still can't find anything, default to Eiffel Tower for demo purposes
  // In a real app, we would return null or ask for clarification
  return mockPOIs[0];
};

// Function to analyze sentiment in user messages (simplified)
export const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
  const lowerText = text.toLowerCase();
  
  const positiveWords = ['great', 'good', 'excellent', 'amazing', 'love', 'perfect', 'yes', 'sure'];
  const negativeWords = ['bad', 'poor', 'terrible', 'awful', 'hate', 'no', 'not'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  for (const word of positiveWords) {
    if (lowerText.includes(word)) {
      positiveScore++;
    }
  }
  
  for (const word of negativeWords) {
    if (lowerText.includes(word)) {
      negativeScore++;
    }
  }
  
  if (positiveScore > negativeScore) {
    return 'positive';
  } else if (negativeScore > positiveScore) {
    return 'negative';
  } else {
    return 'neutral';
  }
};

// Function to extract price range from text
export const extractPriceRange = (text: string): { min: number; max: number } | null => {
  // Default range
  const defaultRange = { min: 0, max: 1000 };
  
  // Look for specific budget mentions
  if (text.toLowerCase().includes('under $100')) {
    return { min: 0, max: 100 };
  }
  
  if (text.toLowerCase().includes('under $200')) {
    return { min: 0, max: 200 };
  }
  
  if (text.toLowerCase().includes('between $100 and $200') || text.toLowerCase().includes('$100-$200')) {
    return { min: 100, max: 200 };
  }
  
  if (text.toLowerCase().includes('between $200 and $300') || text.toLowerCase().includes('$200-$300')) {
    return { min: 200, max: 300 };
  }
  
  if (text.toLowerCase().includes('over $300')) {
    return { min: 300, max: 1000 };
  }
  
  // Try to extract numbers from the text
  const numbers = text.match(/\d+/g);
  if (numbers && numbers.length >= 1) {
    const num = parseInt(numbers[0]);
    
    // If there's a single number, assume it's the max
    if (numbers.length === 1) {
      if (text.toLowerCase().includes('under') || text.toLowerCase().includes('less than')) {
        return { min: 0, max: num };
      } else if (text.toLowerCase().includes('over') || text.toLowerCase().includes('more than')) {
        return { min: num, max: 1000 };
      } else {
        // If no qualifier, assume it's around this price
        return { min: Math.max(0, num - 50), max: num + 50 };
      }
    }
    
    // If there are two numbers, assume it's a range
    if (numbers.length >= 2) {
      const num2 = parseInt(numbers[1]);
      return { min: Math.min(num, num2), max: Math.max(num, num2) };
    }
  }
  
  return defaultRange;
};