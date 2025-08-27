// src/pages/Books.tsx

import * as React from 'react';
import { motion } from 'framer-motion';

// Example data
const books = [
  {
    cover: '/assets/cover1.jpg',
    title: "Tempest’s Omen",
    desc: "Sirens wail; secrets tear loose like shingles in a gale.",
    tags: ['gothic','mystery','storm']
  },
  {
    cover: '/assets/cover2.jpg',
    title: "Ashes in the Wind",
    desc: "A charred diary. A vanished storm-chaser. A town that forgets.",
    tags: ['noir','folkHorror']
  }
];

const Books: React.FC = () => {
  return (
    // motion.section: a regular <section> that can animate
    <motion.section
      className="mx-auto max-w-5xl px-4 py-10"
      initial={{ opacity: 0, y: 12 }}       // start slightly below & transparent
      animate={{ opacity: 1, y: 0 }}        // animate to visible
      transition={{ duration: 0.5 }}        // half-second animation
    >
      <h2 className="text-3xl font-bold mb-2">Books</h2>
      <p className="text-gray-400 mb-8">Hover a book to reveal its description.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((b) => (
          <div
            key={b.title}
            className="flip-card w-full h-80 rounded-xl overflow-hidden bg-gray-900/40 border border-gray-800"
          >
            <div className="flip-card-inner relative w-full h-full">
              {/* FRONT: cover */}
              <div className="absolute inset-0 flip-card-face">
                <img src={b.cover} alt={`${b.title} cover`} className="w-full h-full object-cover" />
              </div>
              {/* BACK: title + description */}
              <div className="absolute inset-0 flip-card-face flip-card-back bg-gray-900/90 p-5 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{b.desc}</p>
                <div className="mt-auto pt-4 text-xs text-gray-400">
                  {b.tags.map(t => `#${t}`).join(' ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Books;