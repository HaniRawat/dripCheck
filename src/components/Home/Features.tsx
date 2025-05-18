import React from 'react';
import { 
  CloudSun, 
  Calendar, 
  Paintbrush, 
  Lightbulb, 
  Check 
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <CloudSun className="w-8 h-8" />,
      title: 'Weather-Smart Outfits',
      items: [
        'Real-time weather integration',
        'Temperature-appropriate suggestions',
        'Location-based recommendations'
      ]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Weekly Planning',
      items: [
        'Plan outfits for the entire week',
        'Special occasion outfits',
        'Seasonal adaptations'
      ]
    },
    {
      icon: <Paintbrush className="w-8 h-8" />,
      title: 'Style Personalization',
      items: [
        'Learn your preferences',
        'Color coordination',
        'Accessory suggestions'
      ]
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Smart Suggestions',
      items: [
        'Mix and match ideas',
        'Style tips and tricks',
        'Climate-based recommendations'
      ]
    }
  ];

  return (
    <section id="features">
      <div className="container-custom">
        <h2 className="section-title">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card card-hover"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="text-primary mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;