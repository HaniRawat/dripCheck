import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    // Show success message
    alert('Message sent successfully!');
  };

  return (
    <section id="contact">
      <div className="container-custom">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="card bg-dark-lighter">
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              {[
                { icon: <MapPin />, title: 'Location', content: 'Faridabad, Haryana' },
                { icon: <Phone />, title: 'Phone', content: '+1234567890' },
                { icon: <Mail />, title: 'Email', content: 'support@forecastfitai.com' }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="card bg-dark-lighter">
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field resize-none"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-full mt-4">
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;