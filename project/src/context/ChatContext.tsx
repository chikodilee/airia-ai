import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { extractLocationFromText } from '../utils/nlp';
import { mockListings } from '../utils/mockData';
import type { Message, POI, Preference, Listing } from '../types';

interface ChatContextProps {
  messages: Message[];
  addMessage: (content: string, sender: 'user' | 'assistant', options?: any) => void;
  isTyping: boolean;
  activeListings: Listing[];
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  userPOI: POI | null;
  userPreferences: Preference;
  updateUserPreferences: (preferences: Partial<Preference>) => void;
  conversationStage: string;
  setConversationStage: (stage: string) => void;
  bookingDetails: any;
  setBookingDetails: (details: any) => void;
  sendUserMessage: (message: string) => void;
  resetChat: () => void;
}

const defaultPreferences: Preference = {
  budget: { min: 0, max: 1000 },
  safety: 'medium',
  cleanliness: 'medium',
  proximity: 'medium',
  amenities: [],
};

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm Airia, your travel buddy. Where are you planning to visit? You can tell me about a conference venue, attraction, or any point of interest.",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userPOI, setUserPOI] = useState<POI | null>(null);
  const [userPreferences, setUserPreferences] = useState<Preference>(defaultPreferences);
  const [conversationStage, setConversationStage] = useState<string>('initial');
  const [activeListings, setActiveListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const addMessage = useCallback(
    (content: string, sender: 'user' | 'assistant', options?: any) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        sender,
        timestamp: new Date(),
        options,
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    []
  );

  const updateUserPreferences = useCallback((preferences: Partial<Preference>) => {
    setUserPreferences((prev) => ({ ...prev, ...preferences }));
  }, []);

  const resetChat = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: "Hi there! I'm Airia, your travel assistant. Where are you planning to visit? You can tell me about a conference venue, attraction, or any point of interest.",
        sender: 'assistant',
        timestamp: new Date(),
      },
    ]);
    setUserPOI(null);
    setUserPreferences(defaultPreferences);
    setConversationStage('initial');
    setActiveListings([]);
    setSelectedListing(null);
    setBookingDetails(null);
  }, []);

  // Process user message and generate assistant response
  const processUserMessage = useCallback(
    async (message: string) => {
      setIsTyping(true);

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Process based on conversation stage
      if (conversationStage === 'initial') {
        // Extract location from text
        const extractedPOI = extractLocationFromText(message);
        if (extractedPOI) {
          setUserPOI(extractedPOI);
          setConversationStage('budget');
          addMessage(
            `Great! I see you're interested in staying near ${extractedPOI.name} in ${extractedPOI.city}. I've marked it on the map. Do you have a nightly budget in mind?`,
            'assistant',
            {
              options: [
                { text: 'Under $100', value: { min: 0, max: 100 } },
                { text: '$100 - $200', value: { min: 100, max: 200 } },
                { text: '$200 - $300', value: { min: 200, max: 300 } },
                { text: 'Over $300', value: { min: 300, max: 1000 } },
                { text: 'No budget constraints', value: { min: 0, max: 2000 } },
              ],
            }
          );
        } else {
          addMessage(
            "I'm not sure I understood the location you mentioned. Could you provide more details about where you'd like to stay? For example, 'near the Eiffel Tower in Paris' or 'close to Central Park in New York'.",
            'assistant'
          );
        }
      } else if (conversationStage === 'budget') {
        // Process budget input
        let budgetRange = { min: 0, max: 1000 };
        
        if (message.toLowerCase().includes('under $100')) {
          budgetRange = { min: 0, max: 100 };
        } else if (message.toLowerCase().includes('$100 - $200')) {
          budgetRange = { min: 100, max: 200 };
        } else if (message.toLowerCase().includes('$200 - $300')) {
          budgetRange = { min: 200, max: 300 };
        } else if (message.toLowerCase().includes('over $300')) {
          budgetRange = { min: 300, max: 1000 };
        }
        
        updateUserPreferences({ budget: budgetRange });
        setConversationStage('proximity');
        
        addMessage(
          "How close would you like to stay to your destination?",
          'assistant',
          {
            options: [
              { text: 'Walking distance (< 15 min)', value: 'close' },
              { text: 'Nearby (15-30 min)', value: 'medium' },
              { text: "I don't mind a bit of travel", value: 'far' },
            ],
          }
        );
      } else if (conversationStage === 'proximity') {
        // Process proximity preference
        let proximity = 'medium';
        
        if (message.toLowerCase().includes('walking') || message.toLowerCase().includes('< 15 min')) {
          proximity = 'close';
        } else if (message.toLowerCase().includes("don't mind") || message.toLowerCase().includes('bit of travel')) {
          proximity = 'far';
        }
        
        updateUserPreferences({ proximity });
        setConversationStage('amenities');
        
        addMessage(
          "What amenities are important for your stay?",
          'assistant',
          {
            options: [
              { text: '🚇 Public Transit', value: 'transit' },
              { text: '🍽️ Restaurants', value: 'restaurants' },
              { text: '☕ Cafés', value: 'cafes' },
              { text: '🛍️ Shopping', value: 'shopping' },
              { text: '🌳 Parks', value: 'parks' },
              { text: '🏋️ Gym', value: 'gym' },
              { text: '🏊 Pool', value: 'pool' },
            ],
            multiSelect: true,
          }
        );
      } else if (conversationStage === 'amenities') {
        // Process amenities preferences
        const amenities: string[] = [];
        
        if (message.toLowerCase().includes('transit')) amenities.push('transit');
        if (message.toLowerCase().includes('restaurant')) amenities.push('restaurants');
        if (message.toLowerCase().includes('café') || message.toLowerCase().includes('cafe')) amenities.push('cafes');
        if (message.toLowerCase().includes('shopping')) amenities.push('shopping');
        if (message.toLowerCase().includes('park')) amenities.push('parks');
        if (message.toLowerCase().includes('gym')) amenities.push('gym');
        if (message.toLowerCase().includes('pool')) amenities.push('pool');
        
        updateUserPreferences({ amenities });
        setConversationStage('listing');
        
        // Filter listings based on preferences
        const filtered = mockListings.filter(listing => {
          const budgetMatch = listing.price >= userPreferences.budget.min && listing.price <= userPreferences.budget.max;
          const proximityMatch = 
            (userPreferences.proximity === 'close' && listing.distanceMinutes <= 15) ||
            (userPreferences.proximity === 'medium' && listing.distanceMinutes <= 30) ||
            (userPreferences.proximity === 'far');
          
          return budgetMatch && proximityMatch;
        }).slice(0, 6);
        
        setActiveListings(filtered);
        
        addMessage(
          `Based on your preferences, I've found ${filtered.length} great places to stay near ${userPOI?.name}. You can browse them below or click on the map to see their locations.`,
          'assistant',
          { listings: filtered }
        );
      } else if (conversationStage === 'listing' && selectedListing) {
        setConversationStage('booking');
        addMessage(
          `Great choice! "${selectedListing.name}" is a popular pick. When would you like to check in and out?`,
          'assistant',
          { dateSelection: true }
        );
      } else if (conversationStage === 'booking') {
        // Process booking details
        setConversationStage('confirmation');
        setBookingDetails({
          dates: { checkin: '2025-05-15', checkout: '2025-05-20' },
          guests: 2,
        });
        
        addMessage(
          `Perfect! Just to confirm, you're booking ${selectedListing?.name} for 2 guests, checking in on May 15, 2025 and checking out on May 20, 2025. The total comes to $${selectedListing ? selectedListing.price * 5 : 0}. Would you like to proceed with this reservation?`,
          'assistant',
          {
            options: [
              { text: 'Confirm Booking', value: 'confirm' },
              { text: 'Change Details', value: 'change' },
            ],
          }
        );
      } else if (conversationStage === 'confirmation') {
        if (message.toLowerCase().includes('confirm')) {
          setConversationStage('complete');
          addMessage(
            "Awesome! I've reserved your spot. You'll get a confirmation email shortly. Safe travels! 🌟 Is there anything else I can help you with?",
            'assistant',
            {
              options: [
                { text: 'Start a new search', value: 'reset' },
                { text: 'No, thanks!', value: 'end' },
              ],
            }
          );
        } else {
          setConversationStage('booking');
          addMessage(
            "No problem! Let's revise your booking details. When would you like to check in and out?",
            'assistant',
            { dateSelection: true }
          );
        }
      } else if (conversationStage === 'complete') {
        if (message.toLowerCase().includes('new search') || message.toLowerCase().includes('reset')) {
          resetChat();
        } else {
          addMessage(
            "Thank you for using Airia! Feel free to come back anytime you're planning your next trip. Safe travels! ✈️",
            'assistant'
          );
        }
      }

      setIsTyping(false);
    },
    [addMessage, conversationStage, resetChat, selectedListing, updateUserPreferences, userPOI, userPreferences]
  );

  const sendUserMessage = useCallback(
    (message: string) => {
      addMessage(message, 'user');
      processUserMessage(message);
    },
    [addMessage, processUserMessage]
  );

  // Handle listing selection from map
  useEffect(() => {
    if (selectedListing && conversationStage === 'listing') {
      addMessage(
        `You've selected "${selectedListing.name}". This ${selectedListing.type} has ${selectedListing.beds} beds and is rated ${selectedListing.rating}/5 by ${selectedListing.reviews} guests. It's a ${selectedListing.distanceMinutes}-minute ${selectedListing.travelMode} to ${userPOI?.name}. Would you like to book this place?`,
        'assistant',
        {
          options: [
            { text: 'Book this place', value: 'book' },
            { text: 'Show me more options', value: 'more' },
          ],
        }
      );
    }
  }, [addMessage, conversationStage, selectedListing, userPOI]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        isTyping,
        activeListings,
        selectedListing,
        setSelectedListing,
        userPOI,
        userPreferences,
        updateUserPreferences,
        conversationStage,
        setConversationStage,
        bookingDetails,
        setBookingDetails,
        sendUserMessage,
        resetChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};