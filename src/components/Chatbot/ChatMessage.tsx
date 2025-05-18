import React from 'react';
import { Message } from '../../types';
import { Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  // Determine if the message contains HTML content
  const containsHtml = isBot && 
    (message.text.includes('<div') || 
     message.text.includes('<span') || 
     message.text.includes('<ul'));
  
  return (
    <div 
      className={`mb-4 ${isBot ? 'mr-auto' : 'ml-auto'} max-w-[85%] animate-fade-up opacity-0`}
      style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
    >
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} items-start gap-2`}>
        {isBot && (
          <div className="w-8 h-8 rounded-full bg-indigo/20 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-indigo" />
          </div>
        )}
        
        <div 
          className={`py-3 px-4 rounded-2xl shadow-sm ${
            isBot 
              ? 'bg-dark-lighter text-white rounded-tl-none' 
              : 'bg-primary text-dark rounded-tr-none'
          }`}
        >
          {containsHtml ? (
            <div dangerouslySetInnerHTML={{ __html: message.text }} />
          ) : (
            <p className="whitespace-pre-wrap">{message.text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;