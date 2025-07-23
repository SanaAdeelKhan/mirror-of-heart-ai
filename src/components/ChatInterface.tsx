import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<Message>;
  isLoading?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage, isLoading }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Assalamu alaikum! Welcome to Mirror of Heart. I'm here to support your emotional and spiritual well-being. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
      spiritualContent: {
        type: 'dua',
        arabic: 'اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي',
        translation: 'O Allah, make my religion right for me, for it is the safeguard of my affairs.',
        reference: 'Sahih Muslim'
      }
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const aiResponse = await onSendMessage(inputValue);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        text: 'I apologize, but I encountered an issue. Please try again. May Allah ease your difficulties.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-peaceful">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 bg-gradient-spiritual border-b border-emerald-lighter/20">
        <div className="relative">
          <Heart className="w-8 h-8 text-pearl" />
          <Sparkles className="w-4 h-4 text-gold absolute -top-1 -right-1" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-pearl">Mirror of Heart</h1>
          <p className="text-sm text-pearl/80">Your spiritual wellness companion</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.isUser ? "justify-end" : "justify-start"
              )}
            >
              <Card
                className={cn(
                  "max-w-[80%] p-4 shadow-gentle",
                  message.isUser
                    ? "bg-emerald text-pearl ml-12"
                    : "bg-card border-emerald-lighter/30 mr-12"
                )}
              >
                <div className="space-y-3">
                  <p className={cn(
                    "text-sm leading-relaxed",
                    message.isUser ? "text-pearl" : "text-foreground"
                  )}>
                    {message.text}
                  </p>
                  
                  {message.spiritualContent && (
                    <div className="border-t border-emerald-lighter/30 pt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span className="text-xs font-medium text-gold uppercase tracking-wide">
                          {message.spiritualContent.type}
                        </span>
                      </div>
                      
                      {message.spiritualContent.arabic && (
                        <p className="text-right font-arabic text-lg text-emerald leading-loose" dir="rtl">
                          {message.spiritualContent.arabic}
                        </p>
                      )}
                      
                      {message.spiritualContent.translation && (
                        <p className="text-sm text-muted-foreground italic">
                          "{message.spiritualContent.translation}"
                        </p>
                      )}
                      
                      {message.spiritualContent.reference && (
                        <p className="text-xs text-emerald font-medium">
                          — {message.spiritualContent.reference}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className={cn(
                    "text-xs opacity-70",
                    message.isUser ? "text-pearl/70" : "text-muted-foreground"
                  )}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </Card>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-card border-emerald-lighter/30 p-4 mr-12 shadow-gentle">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-emerald rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-emerald rounded-full animate-pulse delay-200"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Reflecting on your message...</span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-card border-t border-emerald-lighter/20">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's in your heart..."
            className="flex-1 border-emerald-lighter/30 focus:border-emerald focus:ring-emerald/20"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-spiritual hover:shadow-warm transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};