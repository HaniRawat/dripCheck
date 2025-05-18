export interface UserPreferences {
  name: string;
  gender: string;
  style: string;
  occasions: string[];
  chatHistory: Message[];
  location: Location | null;
  weather: Weather | null;
}

export interface Location {
  lat: number;
  lon: number;
  city?: string;
}

export interface Weather {
  temp: number;
  description: string;
  icon: string;
}

export interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface RequestAnalysis {
  type: 'specific' | 'weekly';
  occasion: string;
  timing: string;
}

export interface Developer {
  name: string;
  id: string;
  image: string;
}