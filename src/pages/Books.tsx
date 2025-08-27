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
    <motion.section
      className="mx-auto max-w-5xl px-4 py-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass p-6 mb-8">
        <h2 className="text-3xl font-bold mb-2 text-slate-100">Books</h2>
        <p className="text-slate-400">Hover a book to reveal its description.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((b) => (
          <div
            key={b.title}
            className="glass w-full h-80 overflow-hidden"
          >
            <div className="relative w-full h-full group">
              {/* FRONT */}
              <div className="absolute inset-0 transition-transform duration-500 [backface-visibility:hidden] group-hover:[transform:rotateY(180deg)]">
                <img src={b.cover} alt={`${b.title} cover`} className="w-full h-full object-cover" />
              </div>
              {/* BACK */}
              <div className="absolute inset-0 bg-black/60 p-5 flex flex-col transition-transform duration-500 [transform:rotateY(180deg)] [backface-visibility:hidden] group-hover:[transform:rotateY(0deg)]">
                <h3 className="text-xl font-semibold mb-2 text-slate-100">{b.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{b.desc}</p>
                <div className="mt-auto pt-4 text-xs text-slate-400">
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