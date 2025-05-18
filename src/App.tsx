import React from 'react';
import Layout from './components/Layout/Layout';
import Hero from './components/Home/Hero';
import About from './components/Home/About';
import Features from './components/Home/Features';
import Chatbot from './components/Chatbot/Chatbot';
import Developers from './components/Developers/Developers';
import Contact from './components/Contact/Contact';
import { Developer } from './types';

function App() {
  // Developer info
  const developers: Developer[] = [
    {
      name: 'Arpitha Raj',
      id: '1/22/FET/BCS/029',
      image: '/arpi.jpg'
    },
    {
      name: 'Palak Khatri',
      id: '1/22/FET/BCS/038',
      image: '/palak.jpg'
    },
    {
      name: 'Hani Singh Rawat',
      id: '1/22/FET/BCS/063',
      image: '/hani.jpg'
    }
  ];

  return (
    <Layout>
      <Hero />
      <About />
      <Features />
      <Chatbot />
      <Developers developers={developers} />
      <Contact />
    </Layout>
  );
}

export default App;