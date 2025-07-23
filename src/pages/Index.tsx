import React, { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ApiKeyDialog } from '@/components/ApiKeyDialog';
import { geminiService } from '@/services/geminiService';
import { useToast } from '@/hooks/use-toast';

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
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (!storedApiKey) {
      setShowApiDialog(true);
    } else {
      geminiService.setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (apiKey: string) => {
    if (apiKey) {
      localStorage.setItem('gemini_api_key', apiKey);
      geminiService.setApiKey(apiKey);
      toast({
        title: "API Key Saved",
        description: "Your Gemini API key has been configured successfully.",
      });
    } else {
      toast({
        title: "Demo Mode Enabled",
        description: "You're using Mirror of Heart in demo mode with simulated responses.",
      });
    }
  };

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
      
      <ApiKeyDialog
        open={showApiDialog}
        onOpenChange={setShowApiDialog}
        onApiKeySubmit={handleApiKeySubmit}
      />
    </div>
  );
};

export default Index;
