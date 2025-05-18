import React, { useState, useRef, useEffect } from 'react';
import { Send, Notebook as Robot, Minus } from 'lucide-react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { Message, UserPreferences, RequestAnalysis } from '../../types';
import { useWeather } from '../../hooks/useWeather';

const Chatbot: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    name: '',
    gender: '',
    style: '',
    occasions: [],
    chatHistory: [],
    location: null,
    weather: null
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { weather, location, findLocationByCity } = useWeather();

  // Initial message
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = "Hi! I'm your AI Outfit Assistant. I can help you plan your outfits for the week. What's your name?";
      addMessage(initialMessage, 'bot');
    }
    // eslint-disable-next-line
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update weather in user preferences when it changes
  useEffect(() => {
    if (weather) {
      setUserPreferences(prev => ({
        ...prev,
        weather
      }));
    }
  }, [weather]);

  // Update location in user preferences when it changes
  useEffect(() => {
    if (location) {
      setUserPreferences(prev => ({
        ...prev,
        location
      }));
    }
  }, [location]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      text,
      sender,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    if (sender === 'user') {
      setUserPreferences(prev => ({
        ...prev,
        chatHistory: [...prev.chatHistory, newMessage]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    // Add user message
    addMessage(inputText, 'user');
    setInputText('');
    setIsTyping(true);

    try {
      // Get bot response
      const response = await getBotResponse(inputText);
      setIsTyping(false);
      addMessage(response, 'bot');
    } catch (error) {
      console.error('Error getting bot response:', error);
      setIsTyping(false);
      addMessage("Sorry, I'm having trouble right now. Please try again.", 'bot');
    }
  };

  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent'; // Replace with your actual Gemini endpoint
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your Gemini API key

  const getOutfitSuggestionFromGemini = async (request: RequestAnalysis) => {
    try {
      const weatherContext = userPreferences.weather
        ? `Current weather: ${userPreferences.weather.temp}°C, ${userPreferences.weather.description}.`
        : 'Weather information not available.';

      const prompt = {
        contents: [{
          parts: [{
            text: `You are the AI Outfit Assistant. Create a detailed outfit suggestion for ${userPreferences.name} (${userPreferences.gender}) using this exact format:

WEATHER INFO
${weatherContext}

OCCASION: ${request.occasion}
DAY: ${request.timing}

MAIN OUTFIT
[Provide 3-4 main clothing items appropriate for the current weather and gender. For each item, specify:
- Exact name of the piece
- Color and pattern details
- Fabric type and quality
- Any unique design elements]

ACCESSORIES
[List 3-4 accessories. For each:
- Specific type and style
- Material and finish
- Color coordination with main outfit
- Any special details or embellishments]

FOOTWEAR
[Describe footwear with:
- Style and type
- Color and material
- Comfort and height details]

STYLING TIPS
[2-3 specific tips about:
- How to wear/style the pieces
- Hair and makeup suggestions
- Weather-appropriate styling advice]

Requirements:
1. Gender: ${userPreferences.gender}
2. Style Preference: ${userPreferences.style}
3. Occasion Type: ${request.occasion}
4. Day/Timing: ${request.timing}
5. Weather Conditions: ${weatherContext}
6. Make suggestions elegant and detailed
7. Include specific colors, materials, and styling
8. Consider the occasion's formality
9. Ensure all pieces coordinate well together
10. Adapt outfit for current weather conditions

Create a unique, personalized outfit suggestion that matches ${userPreferences.name}'s ${userPreferences.style} style preference and is appropriate for the current weather.`
          }]
        }]
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt)
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid API response format');
      }

      const suggestion = data.candidates[0].content.parts[0].text;
      return formatOutfitSuggestion(suggestion, request);
    } catch (error) {
      console.error('API Error:', error);
      return `I apologize, ${userPreferences.name}, but I'm having trouble generating your outfit suggestion right now. Please try again in a moment.`;
    }
  };

  const getBotResponse = async (message: string): Promise<string> => {
    // Handle conversation flow based on user preferences
    if (!userPreferences.name) {
      const name = message;
      setUserPreferences(prev => ({ ...prev, name }));
      return `Nice to meet you, ${name}! Before we continue, could you tell me your city? This will help me check the weather and provide suitable outfit suggestions.`;
    }

    if (userPreferences.location === null || userPreferences.location.city === undefined) {
      // Try to find location by city name
      const success = await findLocationByCity(message);

      if (success) {
        return `Thanks! Now, could you tell me your gender? This will help me provide more personalized outfit suggestions.`;
      } else {
        return `I couldn't find that city. Please try entering a different city name.`;
      }
    }

    if (!userPreferences.gender) {
      const gender = message.toLowerCase();
      setUserPreferences(prev => ({ ...prev, gender }));
      return `Thanks! What's your preferred style? (Casual, Professional, Ethnic, Indo-Western, etc.)`;
    }

    if (!userPreferences.style) {
      const style = message;
      setUserPreferences(prev => ({ ...prev, style }));
      return `Great choice! I'll keep your ${style} style preference in mind. What type of outfits are you looking for? (Work, Wedding, Sangeet, Party, Casual, etc.)`;
    }

    if (userPreferences.occasions.length === 0) {
      const occasions = message.split(',').map(occ => occ.trim());
      setUserPreferences(prev => ({ ...prev, occasions }));
      return `Perfect! I'll help you create stylish outfits for: ${occasions.join(', ')}. Just tell me which occasion you'd like an outfit for!`;
    }

    // If we have all basic info, analyze the request and provide an outfit suggestion
    const request = analyzeRequest(message);
    return await getOutfitSuggestionFromGemini(request);
  };

  const analyzeRequest = (message: string): RequestAnalysis => {
    const messageLower = message.toLowerCase();

    // Define occasion patterns
    const occasions: Record<string, string[]> = {
      wedding: ['wedding', 'marriage', 'bride', 'groom', 'bridal'],
      sangeet: ['sangeet', 'sangeeth', 'dance', 'mehendi', 'mehndi'],
      party: ['reception', 'party', 'celebration', 'club', 'night out', 'dinner'],
      work: ['work', 'office', 'business', 'professional', 'meeting'],
      casual: ['casual', 'daily', 'regular', 'everyday'],
      festival: ['festival', 'puja', 'diwali', 'holi', 'navratri'],
      date: ['date', 'dinner date', 'romantic'],
      interview: ['interview', 'job', 'formal meeting']
    };

    // Find the occasion
    let occasion = 'general';
    for (const [key, keywords] of Object.entries(occasions)) {
      if (keywords.some(keyword => messageLower.includes(keyword))) {
        occasion = key;
        break;
      }
    }

    // Determine request type
    let type: RequestAnalysis['type'] = 'specific';
    if (messageLower.includes('week') || messageLower.includes('all')) {
      type = 'weekly';
    }

    // Check for timing
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let timing = 'any';
    for (const day of days) {
      if (messageLower.includes(day)) {
        timing = day;
        break;
      }
    }

    return { type, occasion, timing };
  };

  // Format the outfit suggestion for display
  const formatOutfitSuggestion = (suggestion: string, request: RequestAnalysis) => {
    const sections = suggestion.split('\n\n');

    let formattedHtml = '<div class="outfit-suggestion">';

    // Add weather information if available
    if (userPreferences.weather) {
      formattedHtml += `
        <div class="weather-info">
          <div class="weather-details">
            <div class="weather-temp">${userPreferences.weather.temp}°C</div>
            <div class="weather-desc">${userPreferences.weather.description}</div>
          </div>
        </div>`;
    }

    // Format header section
    const headerSection = sections.find(section =>
      section.includes('OCCASION:') || section.includes('DAY:')
    );

    if (headerSection) {
      const headerLines = headerSection.split('\n');
      formattedHtml += '<div class="outfit-header">';
      headerLines.forEach(line => {
        if (line.includes(':')) {
          const [key, value] = line.split(':').map(part => part.trim());
          formattedHtml += `
            <div class="header-item">
              <span class="header-label">${key}</span>
              <span class="header-value">${value}</span>
            </div>`;
        }
      });
      formattedHtml += '</div>';
    }

    // Process main sections
    const mainSections = sections.filter(section =>
      !section.includes('OCCASION:') && !section.includes('DAY:')
    );

    mainSections.forEach(section => {
      if (!section.trim()) return;

      const lines = section.trim().split('\n');
      const sectionTitle = lines[0].trim().replace(/:/g, '');

      const sectionIcon = getSectionIcon(sectionTitle);

      formattedHtml += `
        <div class="outfit-section">
          <div class="section-header">
            <h4 class="section-title">
              <i class="${sectionIcon}"></i>
              <span>${sectionTitle}</span>
            </h4>
          </div>
          <div class="section-content">`;

      // Group items by main piece
      let currentItem = '';
      let currentDetails: string[] = [];
      const items: { title: string, details: string[] }[] = [];

      lines.slice(1).forEach(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;

        if (!trimmedLine.startsWith('-')) {
          if (currentItem) {
            items.push({
              title: currentItem,
              details: currentDetails
            });
          }
          currentItem = trimmedLine;
          currentDetails = [];
        } else {
          currentDetails.push(trimmedLine.substring(1).trim());
        }
      });

      // Add the last item
      if (currentItem) {
        items.push({
          title: currentItem,
          details: currentDetails
        });
      }

      if (items.length > 0) {
        formattedHtml += '<ul class="item-list">';
        items.forEach(item => {
          if (sectionTitle === 'STYLING TIPS') {
            formattedHtml += `
              <li class="style-tip">
                <span class="tip-text">${item.title}</span>
              </li>`;
          } else {
            formattedHtml += `
              <li class="outfit-item">
                <div class="item-content">
                  <div class="item-title">${item.title}</div>
                  ${item.details.length > 0 ? '<ul class="item-details">' +
              item.details.map(detail => `<li>${detail}</li>`).join('') +
              '</ul>' : ''}
                </div>
              </li>`;
          }
        });
        formattedHtml += '</ul>';
      }

      formattedHtml += '</div></div>';
    });

    formattedHtml += '</div>';
    return formattedHtml;
  };

  const getSectionIcon = (sectionTitle: string) => {
    const icons: Record<string, string> = {
      'MAIN OUTFIT': 'fas fa-tshirt',
      'ACCESSORIES': 'fas fa-gem',
      'FOOTWEAR': 'fas fa-shoe-prints',
      'STYLING TIPS': 'fas fa-magic',
      'WEATHER INFO': 'fas fa-cloud'
    };
    return icons[sectionTitle] || 'fas fa-circle';
  };

  return (
    <section id="chatbot" className="bg-dark-lighter py-16">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="bg-dark rounded-2xl overflow-hidden shadow-xl border border-gray-800">
          {/* Chatbot Header */}
          <div className="bg-dark-card p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo/20 flex items-center justify-center">
                <Robot className="w-6 h-6 text-indigo" />
              </div>
              <h2 className="text-xl font-semibold">ForecastFit AI Chat</h2>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Minimize chat"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <div className="p-4 h-96 overflow-y-auto bg-dark-lighter/50">
                {messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg}
                  ref={index === messages.length - 1 ? messagesEndRef : undefined} />
                ))}
                {isTyping && <TypingIndicator />}
                {/* <div ref={messagesEndRef} /> */}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="p-4 bg-dark-card border-t border-gray-800 flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask for outfit suggestions..."
                  className="input-field flex-1"
                />
                <button
                  type="submit"
                  className="btn btn-primary p-3"
                  disabled={isTyping}
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chatbot;