// src/pages/Books.tsx

import * as React from 'react';
import { motion } from 'framer-motion';
import { SiAmazon } from 'react-icons/si';

type Book = {
  cover: string;
  title: string;
  desc: string;
  amazon: string;
  tags: string[];
};

// Book data
const books: Book[] = [
  {
    cover: '/assets/books/book1.jpg',
    title: 'Birthrite',
    desc:
      "When the infamous Bible Belt collides with an ancient dark magic, it's a veritable whirlwind of devastation the likes of which makes even the strongest question what's right and wrong. Follow young David Allen Barclay's journey through adolescent tribulations no child should ever have to endure. MALEFICIA: Birthrite is the first novel in a trilogy which chronicles David through his formidable childhood years on the great plains of Kansas. Will he have the strength to ward off an evil entity which haunts his every dream, or will he succumb to the demon's thirst for Barclay blood?",
    amazon: 'https://www.amazon.com/Maleficia-Birthrite-Michael-S-Haralson/dp/B0CTHBFT9P',
    tags: ['gothic', 'dark-magic', 'coming-of-age'],
  },
  {
    cover: '/assets/books/book2.jpg',
    title: "A Mother's Sins",
    desc:
      "A mysterious imp of a woman, a man who wanders the woods late at night, and secrets that the new moon hides await David Barclay after suffering the ultimate tragedies which occurred at his home in Kansas. Forced to relocate to a small, backwoods Arkansas town with his aunt and uncle, Ada Valley becomes his new home and within it, his awakening to the birthright he was born into. If it doesn't break him, first.",
    amazon: 'https://www.amazon.com/MALEFICIA-Mothers-Sins-Michael-Haralson/dp/B0CTCN74QQ',
    tags: ['folk-horror', 'noir', 'arkansas'],
  },
  {
    cover: '/assets/books/book3.jpg',
    title: 'Suffer Not',
    desc:
      'Waking up from an utter disaster somewhere in rural Kansas, David Allen Barclay find himself in his old stomping grounds, grounds he navigated years and years ago. Only now he faces all new challenges in a somewhat familiar terrain. Will he get to see Claire once more? What has become of Andy? Would they even recognize him since his departure to Arkansas? And if they did, would they accept him again?',
    amazon: 'https://www.amazon.com/MALEFICIA-Suffer-Michael-S-Haralson/dp/B0CXLVP215',
    tags: ['return', 'midwest', 'reckoning'],
  },
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
          <BookCard key={b.title} book={b} />
        ))}
      </div>
    </motion.section>
  );
};

export default Books;

// --- Internal: BookCard with tap-to-flip on touch + mobile buy options ---
const BookCard: React.FC<{ book: Book }> = ({ book: b }) => {
  const [flipped, setFlipped] = React.useState(false);

  const onCardClick = () => setFlipped((f) => !f);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="glass book-card w-full overflow-hidden" style={{ aspectRatio: '2 / 3' }}>
      <div className="relative w-full h-full group cursor-pointer" style={{ perspective: '1000px' }} onClick={onCardClick}>
        <div className="relative w-full h-full transition-transform duration-300 group-hover:[transform:rotateX(2deg)_rotateY(-2deg)_scale(1.02)]">
        {/* FRONT */}
        <div
          className="book-surface absolute inset-0 transition-transform duration-500 [backface-visibility:hidden] group-hover:[transform:rotateY(180deg)]"
          style={flipped ? { transform: 'rotateY(180deg)' } : undefined}
        >
          <img src={b.cover} alt={`${b.title} cover`} className="w-full h-full object-cover" style={{ borderRadius: 'inherit' }} />
          {/* Extra-small overlay CTA (under 640px) */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent sm:hidden">
            <div className="mb-2"><span className="badge-glass">Tap to flip</span></div>
            <a
              href={b.amazon}
              target="_blank"
              rel="noreferrer noopener"
              onClick={stop}
              className="btn btn-amazon focus-ring inline-flex items-center gap-2 text-sm w-full justify-center"
              aria-label={`Buy ${b.title} on Amazon`}
            >
              <SiAmazon size={16} /> Buy on Amazon
            </a>
          </div>
        </div>

        {/* BACK */}
        <div
          className="book-surface absolute inset-0 bg-black/60 p-5 flex flex-col transition-transform duration-500 [transform:rotateY(180deg)] [backface-visibility:hidden] group-hover:[transform:rotateY(0deg)]"
          style={flipped ? { transform: 'rotateY(0deg)' } : undefined}
        >
          <h3 className="text-xl font-semibold mb-2 text-slate-100">{b.title}</h3>
          <div className="text-sm text-slate-300 leading-relaxed overflow-auto pr-1">
            {b.desc}
          </div>
          <div className="mt-auto pt-4 flex items-center justify-between gap-2">
            <div className="text-xs text-slate-400">{b.tags.map((t) => `#${t}`).join(' ')}</div>
            <a
              href={b.amazon}
              target="_blank"
              rel="noreferrer noopener"
              onClick={stop}
              className="btn btn-amazon focus-ring inline-flex items-center gap-2 text-sm"
              aria-label={`Buy ${b.title} on Amazon`}
            >
              <SiAmazon size={16} /> Buy on Amazon
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Mobile-only secondary buy bar (640–767px) */}
      <div className="hidden sm:flex md:hidden items-center justify-between mt-2">
        <div className="text-slate-300 text-sm truncate pr-3">{b.title}</div>
        <a
          href={b.amazon}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-amazon focus-ring inline-flex items-center gap-2 text-sm"
          aria-label={`Buy ${b.title} on Amazon`}
        >
          <SiAmazon size={16} /> Buy
        </a>
      </div>
    </div>
  );
};
