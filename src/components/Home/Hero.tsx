import React from 'react';
import { ArrowRight, Users, Shirt as TShirt, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-hero-gradient relative overflow-hidden pt-16">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 animate-gradient-move"></div>
      
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-title-fade bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">
          Your Personal AI Outfit Planner
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-fade-up " style={{ animationDelay: '0.3s' }}>
          Let our AI help you plan your outfits for the week. Stay stylish, organized, and confident with personalized fashion recommendations.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-16 animate-fade-up " style={{ animationDelay: '0.6s' }}>
          {[
            { icon: <Users className="w-8 h-8 text-primary" />, number: '10K+', label: 'Happy Users' },
            { icon: <TShirt className="w-8 h-8 text-primary" />, number: '50K+', label: 'Outfits Created' },
            { icon: <Star className="w-8 h-8 text-primary" />, number: '4.9', label: 'User Rating' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="stat-item bg-white/5 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 hover:-translate-y-2"
            >
              {stat.icon}
              <div className="text-3xl font-bold mt-3 mb-1">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <a 
          href="#chatbot" 
          className="btn btn-primary text-lg animate-fade-up " 
          style={{ animationDelay: '0.9s' }}
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default Hero;