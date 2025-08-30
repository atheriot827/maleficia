// src/pages/Books.tsx

import * as React from 'react';
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
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="glass p-6 mb-8">
        <h2 className="text-3xl font-bold mb-2 text-slate-100">Books</h2>
        <p className="text-slate-400">Hover or tap a book to flip it.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {books.map((b) => (
          <BookCard key={b.title} book={b} />
        ))}
      </div>
    </section>
  );
};

export default Books;

// --- Internal: BookCard using requested structure (hover rotate, click flip) ---
const BookCard: React.FC<{ book: Book }> = ({ book: b }) => {
  const [hovered, setHovered] = React.useState(false);
  const [flipped, setFlipped] = React.useState(false);

  const onFrontClick = (e: React.MouseEvent) => { e.stopPropagation(); setFlipped(true); };
  const onBackClick = (e: React.MouseEvent) => { e.stopPropagation(); setFlipped(false); };

  return (
    <div className="book-card no-spine mx-auto w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px]" style={{ aspectRatio: '2 / 3' }}>
      <div className="book-shadow" />
      <div className="perspective">
        <div
          className={`book-wrap ${hovered ? 'rotate' : ''} ${flipped ? 'flip' : ''}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="book" style={{ backgroundImage: `url(${b.cover})` }} onClick={onFrontClick} />
          <div className="title"><span className="spine-text">{b.title}</span></div>
          <div className="book-back" onClick={onBackClick}>
            <div className="text">
              <h3 className="text-xl font-semibold mb-2 text-slate-100">{b.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{b.desc}</p>
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between gap-2">
              <div className="text-xs text-slate-400">{b.tags.map((t) => `#${t}`).join(' ')}</div>
              <a
                href={b.amazon}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-amazon focus-ring inline-flex items-center gap-2 text-sm"
                aria-label={`Buy ${b.title} on Amazon`}
              >
                <SiAmazon size={16} /> Buy on Amazon
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
