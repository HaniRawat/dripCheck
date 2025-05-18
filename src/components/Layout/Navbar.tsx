import React, { useState } from 'react';
import { Shirt as TShirt, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-dark/95 backdrop-blur-md py-4 px-6 flex justify-between items-center z-50 shadow-lg">
      <div className="flex items-center gap-2 text-xl font-bold text-primary">
        <TShirt className="w-6 h-6" />
        <span>DripCheck AI</span>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop menu */}
      <ul className="hidden md:flex gap-8">
        {['Home', 'About', 'Features', 'Contact'].map((item) => (
          <li key={item}>
            <a 
              href={`#${item.toLowerCase()}`} 
              className="text-white hover:text-primary px-3 py-2 rounded transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-md p-4 shadow-lg">
          <ul className="flex flex-col">
            {['Home', 'About', 'Features', 'Contact'].map((item) => (
              <li key={item} className="py-2">
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white hover:text-primary block px-3 py-2 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;