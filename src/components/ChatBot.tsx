import React, { useState } from 'react';
import './ChatBot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hej! 👋 Jag är Adidas shopbot. Hur kan jag hjälpa dig idag?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    'Hur mycket kostar frakt?',
    'Vilka fotbollsskor har ni?',
    'Hur lång leveranstid?',
    'Kan jag returnera?',
    'Har ni storlek 43?',
  ];

  const botResponses: { [key: string]: string } = {
    'frakt': 'Vi erbjuder två fraktalternativ:\n• Vanlig leverans: 49 kr (3-5 dagar)\n• Snabb leverans: 99 kr (1-2 dagar)\nLeverantörer: PostNord, DHL, GLS och Instabox',
    'fotbollsskor': 'Vi har ett stort urval av fotbollsskor! Du kan se alla modeller genom att välja "Fotbollsskor" i filtret på shoppsidan. Vi har allt från budget-modeller till professionella match-skor.',
    'leveranstid': 'Vanlig leverans tar 3-5 arbetsdagar, och snabb leverans tar 1-2 arbetsdagar. Tider räknas från beställningstillfället.',
    'returnera': 'Du kan returnera varor inom 30 dagar från köpdatum utan kostnad. Originaletikett och förpackning krävs.',
    'storlek': 'Vi har de flesta storlekar i lager! Du kan filtrera efter storlek på produktsidan. Om du inte hittar din storlek, kontakta oss så hjälper vi gärna.',
    'pris': 'Våra priser varierar från 449 kr till 1899 kr beroende på modell och typ. Alla priser är inklusive moms.',
    'rabatt': 'Vi erbjuder ofta rabatter på utvalda produkter. Håll utkik efter röda priser och specialerbjudanden!',
    'tvätta': 'Tvättråd: Tvätta i kallvatten på låg temperatur. Låt lufttorka - aldrig i maskin eller tumtork. Använd skonsam rengöring.',
    'garanti': 'Alla skor kommer med 2 års garanti mot fabrikationsfel.',
    'kontakt': 'Du kan nå oss på support@adidasshop.se eller ring 08-123 456 på vardagar 09-17.',
    'standardsvar': 'Jag är här för att hjälpa! Du kan fråga mig om:\n• Frakt och leverans\n• Produkter och storlekar\n• Returner och reklamationer\n• Tvätt- och skötselråd\n\nVad kan jag hjälpa dig med?',
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'standardsvar' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return botResponses['standardsvar'];
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleQuickReply = (reply: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: reply,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(reply),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Adidas Support 🤖</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.sender === 'bot' ? '🤖 ' : ''}
              {message.text}
            </div>
            <span className="message-time">
              {message.timestamp.toLocaleTimeString('sv-SE', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>

      <div className="chatbot-quick-replies">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="quick-reply-btn"
            onClick={() => handleQuickReply(reply)}
          >
            {reply}
          </button>
        ))}
      </div>

      <div className="chatbot-input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Skriv din fråga..."
        />
        <button onClick={handleSendMessage}>Skicka</button>
      </div>
    </div>
  );
};

export default ChatBot;
