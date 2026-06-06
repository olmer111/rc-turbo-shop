
/**
 * Checkout and User Registration Implementation Mockup
 */

// components/RegistrationForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call Backend: POST /users/register
    alert('Cuenta creada exitosamente, jefe 👑');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Únete al Equipo RC Speed</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-400 text-xs font-bold uppercase">Usuario</label>
          <input 
            type="text" 
            className="w-full bg-zinc-800 text-white p-3 rounded-lg outline-none border border-transparent focus:border-red-600 transition-all" 
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs font-bold uppercase">Email</label>
          <input 
            type="email" 
            className="w-full bg-zinc-800 text-white p-3 rounded-lg outline-none border border-transparent focus:border-red-600 transition-all" 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="text-gray-400 text-xs font-bold uppercase">Contraseña</label>
          <input 
            type="password" 
            className="w-full bg-zinc-800 text-white p-3 rounded-lg outline-none border border-transparent focus:border-red-600 transition-all" 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all">
          REGISTRARSE
        </button>
      </form>
    </motion.div>
  );
};

// components/Checkout.tsx
import React from 'react';
import { motion } from 'framer-motion';

export const Checkout = ({ total }) => {
  const handlePayment = async () => {
    // 1. Request Payment Session from Backend (POST /orders/create-session)
    // 2. Redirect to Stripe/PayPal
    // 3. Return to Success page via Webhook
    alert('Redirigiendo a la pasarela de pago segura...');
  };

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }}
      className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 max-w-sm"
    >
      <h3 className="text-xl font-bold text-white mb-4">Resumen de Pago</h3>
      <div className="flex justify-between text-gray-400 mb-2">
        <span>Subtotal:</span>
        <span>${total}</span>
      </div>
      <div className="flex justify-between text-gray-400 mb-4">
        <span>Envío:</span>
        <span className="text-green-500">Gratis</span>
      </div>
      <div className="border-t border-zinc-800 pt-4 mb-6 flex justify-between items-center">
        <span className="text-white font-bold">Total:</span>
        <span className="text-2xl font-black text-red-600">${total}</span>
      </div>
      <button 
        onClick={handlePayment}
        className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all"
      >
        PAGAR AHORA 💳
      </button>
    </motion.div>
  );
};

// backend/src/orders/orders.service.ts (Payment Logic)
/*
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class OrdersService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

  async createPaymentSession(userId: string, items: any[]) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: { currency: 'usd', product_data: { name: item.name }, unit_amount: item.price * 100 },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    return { url: session.url };
  }

  async handleWebhook(payload: string, signature: string) {
    // Verify signature and update order status to 'paid' in DB
  }
}
*/
