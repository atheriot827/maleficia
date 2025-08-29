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
      <div className="glass p-6">
        <h2 className="text-3xl font-bold mb-6 text-slate-100">Contact the Author</h2>
        <form onSubmit={onSubmit}>
          <label className="block mb-1 text-slate-300" htmlFor="name">Your Name</label>
          <input id="name" className="input mb-3 focus-ring" value={name} onChange={e=>setName(e.target.value)} required />

          <label className="block mb-1 text-slate-300" htmlFor="email">Your Email</label>
          <input id="email" className="input mb-3 focus-ring" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

          <label className="block mb-1 text-slate-300" htmlFor="message">Message</label>
          <textarea id="message" className="input mb-4 focus-ring" rows={5} value={message} onChange={e=>setMessage(e.target.value)} required />

          <button className="btn btn-primary w-full focus-ring" type="submit">Send Message</button>
          <p className="mt-3 text-sm text-slate-400 min-h-[1.25rem]">{status}</p>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
