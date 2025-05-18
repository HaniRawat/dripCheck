import React from 'react';
import { Shirt as TShirt, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-lighter pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="footer-section">
            <h4 className="text-primary text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Features', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-primary transition-all hover:pl-2"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="text-primary text-lg mb-4">Features</h4>
            <ul className="space-y-2">
              {[
                ['AI Chat', 'chatbot'],
                ['Weekly Planning', 'features'],
                ['Style Tips', 'features'],
                ['Personalization', 'features']
              ].map(([title, link]) => (
                <li key={title}>
                  <a 
                    href={`#${link}`} 
                    className="text-gray-400 hover:text-primary transition-all hover:pl-2"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="text-primary text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest fashion tips and updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input-field rounded-r-none"
                required
              />
              <button 
                type="submit" 
                className="bg-primary text-dark p-3 rounded-r-lg hover:bg-primary-dark transition-colors"
                aria-label="Subscribe"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800">
          <p className="text-gray-400">&copy; 2025 ForecastFit AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-gray-400 hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;