import React from 'react';
import { Brain, Palette, Clock, RefreshCw } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Smart AI Technology',
      description: 'Powered by advanced AI algorithms to understand your style preferences and create perfect outfit combinations.'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Style Expertise',
      description: 'Combines fashion industry knowledge with personal style preferences for unique outfit recommendations.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Time-Saving',
      description: 'Plan your entire week\'s outfits in minutes, saving you precious time in your daily routine.'
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: 'Always Fresh',
      description: 'Never repeat the same outfit combinations with our diverse suggestion algorithm.'
    }
  ];

  return (
    <section id="about" className="bg-dark-lighter">
      <div className="container-custom">
        <h2 className="section-title">About Our DripCheck AI</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card card-hover text-center"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="text-primary mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;