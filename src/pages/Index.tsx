import React, { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { geminiService } from '@/services/geminiService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  spiritualContent?: {
    type: 'ayah' | 'dua' | 'dhikr';
    arabic?: string;
    translation?: string;
    reference?: string;
  };
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText: string): Promise<Message> => {
    setIsLoading(true);
    
    try {
      const response = await geminiService.generateResponse(messageText);
      
      const aiMessage: Message = {
        id: Date.now().toString() + '_ai',
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        spiritualContent: response.spiritualContent
      };
      
      return aiMessage;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-peaceful">
      <ChatInterface
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Index;
