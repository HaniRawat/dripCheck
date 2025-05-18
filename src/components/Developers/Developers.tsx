import React from 'react';
import { Developer } from '../../types';

interface DevelopersProps {
  developers: Developer[];
}

const Developers: React.FC<DevelopersProps> = ({ developers }) => {
  return (
    <section className="bg-dark-card py-16">
      <div className="container-custom">
        <h2 className="section-title text-gray-200 mb-14">Meet the Developers</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {developers.map((developer, index) => (
            <div 
              key={index}
              className="bg-dark-section rounded-xl p-8 text-center w-full max-w-xs shadow-lg border border-gray-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo/5"
            >
              <div className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-3 border-indigo shadow-lg shadow-indigo/20">
                <img 
                  src={developer.image} 
                  alt={developer.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="text-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-indigo-light">{developer.name}</h3>
                <p className="text-gray-400">{developer.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;