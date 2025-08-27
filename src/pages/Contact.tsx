// src/pages/Contact.tsx
import * as React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('Message sent!'); setName(''); setEmail(''); setMessage('');
    } catch (err) {
      console.error('[Contact] error:', err);
      setStatus('Failed to send. Please try again.');
    }
  }

  return (
    <motion.section
      className="mx-auto max-w-md px-4 py-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">Contact the Author</h2>
      <form onSubmit={onSubmit} className="p-5 bg-gray-900/60 border border-gray-800 rounded">
        <label className="block mb-1">Your Name</label>
        <input className="w-full mb-3 p-2 text-gray-900 rounded" value={name} onChange={e=>setName(e.target.value)} required />

        <label className="block mb-1">Your Email</label>
        <input className="w-full mb-3 p-2 text-gray-900 rounded" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

        <label className="block mb-1">Message</label>
        <textarea className="w-full mb-4 p-2 text-gray-900 rounded" rows={5} value={message} onChange={e=>setMessage(e.target.value)} required />

        <button className="w-full bg-purple-700 hover:bg-purple-600 py-2 rounded" type="submit">Send Message</button>
        <p className="mt-3 text-sm text-gray-400 min-h-[1.25rem]">{status}</p>
      </form>
    </motion.section>
  );
};

export default Contact;