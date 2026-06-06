
/**
 * FRONTEND implementation for the RC Cart E-commerce
 * Using Next.js, Tailwind CSS, and Framer Motion.
 */

// components/Navbar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Navbar = () => (
  <motion.nav 
    initial={{ y: -100 }} 
    animate={{ y: 0 }} 
    className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-black/80 backdrop-blur-md text-white"
  >
    <div className="text-2xl font-bold tracking-tighter">RC <span className="text-red-500">SPEED</span></div>
    <div className="hidden md:flex gap-6 font-medium">
      <Link href="/" className="hover:text-red-500 transition-colors">Inicio</Link>
      <Link href="/products" className="hover:text-red-500 transition-colors">Catálogo</Link>
      <Link href="/contact" className="hover:text-red-500 transition-colors">Contacto</Link>
    </div>
    <div className="flex items-center gap-4">
      <Link href="/cart" className="relative p-2 bg-white/10 rounded-full">
        🛒 <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
      </Link>
      <Link href="/login" className="bg-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all">Entrar</Link>
    </div>
  </motion.nav>
);

// components/Hero.tsx
import { motion } from 'framer-motion';

export const Hero = () => (
  <section className="relative h-screen flex flex-col justify-center items-center text-center text-white px-4 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.8 }}
      className="z-10"
    >
      <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">
        Domina el <span className="text-red-600">Asfalto</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8">
        Experimenta la velocidad extrema con nuestros carritos RC de grado profesional. Diseño aerodinámico y potencia bruta.
      </p>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg shadow-red-600/50 hover:bg-red-700 transition-all"
      >
        VER CATÁLOGO 🏎️
      </motion.button>
    </motion.div>
    <motion.div 
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 1, 0]
      }} 
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-20 w-full max-w-4xl"
    >
      <img src="https://via.placeholder.com/800x400?text=RC+Car+3D+Render" alt="RC Car" className="w-full h-auto drop-shadow-2xl" />
    </motion.div>
  </section>
);

// components/ProductCard.tsx
import { motion } from 'framer-motion';

export const ProductCard = ({ product }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl group overflow-hidden"
  >
    <div className="relative h-64 mb-4 overflow-hidden rounded-xl">
      <motion.img 
        whileHover={{ scale: 1.1 }} 
        transition={{ duration: 0.3 }}
        src={product.imageUrl} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
        NUEVO
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">{product.name}</h3>
    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-2xl font-black text-white">${product.price}</span>
      <button className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all">
        + Añadir
      </button>
    </div>
  </motion.div>
);

// components/Chatbot.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: '¡Hola jefe 👑! ¿En qué puedo ayudarte hoy?', sender: 'bot' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages([...messages, userMsg]);
    setInput('');

    // Mock API call to Backend
    const response = await fetch('/api/chatbot/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-zinc-900 border border-zinc-800 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            <div className="bg-red-600 p-4 text-white font-bold flex justify-between items-center">
              <span>Asistente RC Speed 🏎️</span>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`p-2 rounded-lg max-w-[80%] ${m.sender === 'bot' ? 'bg-zinc-800 text-white self-start' : 'bg-red-600 text-white self-end ml-auto'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-zinc-800 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-zinc-800 text-white p-2 rounded-lg text-xs outline-none" 
                placeholder="Escribe tu duda..." 
              />
              <button onClick={sendMessage} className="bg-red-600 text-white p-2 rounded-lg text-xs font-bold">Enviar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-red-600 rounded-full shadow-xl flex items-center justify-center text-2xl cursor-pointer"
      >
        💬
      </motion.button>
    </div>
  );
};

// pages/index.tsx
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { Chatbot } from '../components/Chatbot';

export default function Home() {
  const products = [
    { id: '1', name: 'RC Turbo Beast', description: 'El más rápido de la gama, ideal para pistas profesionales.', price: 199, imageUrl: 'https://via.placeholder.com/300x200?text=Turbo+Beast' },
    { id: '2', name: 'Off-Road Monster', description: 'Todo terreno imparable, suspensión hidráulica avanzada.', price: 249, imageUrl: 'https://via.placeholder.com/300x200?text=Monster+Truck' },
    { id: '3', name: 'Drift King', description: 'Control absoluto en curvas cerradas, neumáticos de goma especial.', price: 159, imageUrl: 'https://via.placeholder.com/300x200?text=Drift+King' },
  ];

  return (
    <main className="bg-black min-h-screen font-sans">
      <Navbar />
      <Hero />
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-white text-center mb-12 uppercase italic tracking-tighter">
          Catálogo de <span className="text-red-600">Bestias</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
      <Chatbot />
    </main>
  );
}
