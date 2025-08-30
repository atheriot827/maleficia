import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PlaylistDialog from "../components/PlaylistDialog";
import { useState } from "react";

const Home: React.FC = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 md:py-16 space-y-10">
      {/* Hero */}
      <motion.div
        className="glass p-8 md:p-10 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <h1 className="gothic text-4xl md:text-5xl lg:text-6xl text-slate-100 mb-2">
          Michael S. Haralson
        </h1>
        <div className="badge-glass inline-block mb-3">Author of the Supernatural</div>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Step Into the Shadows with Michael S. Haralson — unveil the dark stories
          buried deep within his mind and pen.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/books" className="btn btn-primary focus-ring w-full sm:w-auto">Explore Books</Link>
          <PlaylistDialog label="Listen to Playlists" buttonClassName="btn btn-ghost focus-ring w-full sm:w-auto inline-flex items-center gap-2" iconSize={18} />
        </div>
      </motion.div>

      {/* Featured Book Spotlight */}
      <motion.section
        className="glass p-6 md:p-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="book-card no-spine w-[220px] md:w-[260px]" style={{ aspectRatio: '2 / 3' }}>
            <div className="book-shadow" />
            <div className="perspective">
              <div className="book-wrap feature-tilt">
                <div className="book" style={{ backgroundImage: 'url(/assets/books/book1.jpg)' }} />
                <div className="title"><span className="spine-text">Birthrite</span></div>
                <div className="book-back">
                  <div className="text">
                    <h3 className="text-xl font-semibold mb-2 text-slate-100">Birthrite</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      The first in the MALEFICIA trilogy. When the Bible Belt collides with an ancient dark magic,
                      a whirlwind of devastation forces David Barclay to confront an inheritance he can’t escape.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-2">Featured: Birthrite</h2>
            <p className="text-slate-300 max-w-xl">
              Start here. "MALEFICIA: Birthrite" weaves a tale that begins with the tender hopes of an expanding family before diving into the depths of ancient vendettas awakening.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.amazon.com/Maleficia-Birthrite-Michael-S-Haralson/dp/B0CTHBFT9P"
                target="_blank" rel="noreferrer noopener"
                className="btn btn-amazon focus-ring"
              >Buy on Amazon</a>
              <Link to="/books" className="btn btn-ghost focus-ring">More Books</Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Playlists Tile removed (hero dialog handles playlists) */}

      {/* Latest Blog Posts */}
      <motion.section
        className="glass p-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-100">Latest from the Blog</h3>
          <Link to="/blog" className="link">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'When the Sirens Call', date: 'Aug 23, 2025', teaser: 'The sky blackened at 3:07 pm...' },
            { title: 'Writing in the Dark', date: 'Aug 12, 2025', teaser: 'Notes on pacing dread without losing hope.' },
            { title: 'Soundtracking MALEFICIA', date: 'Aug 02, 2025', teaser: 'Why these tracks shape the storm.' },
          ].map((p) => (
            <Link key={p.title} to="/blog" className="glass p-4 hover:bg-white/5 transition">
              <div className="text-slate-400 text-sm">{p.date}</div>
              <div className="text-slate-100 font-semibold">{p.title}</div>
              <div className="text-slate-300 text-sm mt-1">{p.teaser}</div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* About the Author */}
      <motion.section
        className="glass p-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-slate-100 mb-2">About the Author</h3>
        <p className="text-slate-300 max-w-3xl">
          Michael S. Haralson writes gothic-leaning supernatural fiction steeped in Midwestern myth and
          Southern folklore. His work blends quiet dread, human frailty, and the thin places where the veil
          slips.
          Michael currently resides in Wichita, Kansas, not far from the fictional town where David Barclay grew up. In his spare time, he enjoys strolling through forgotten cemeteries, restoring old hot rods, and of course, writing. Michael is the father to a son and two beautiful daughters and a new grandfather, not to mention the four canine children who claim him as their pack leader.
        </p>
      </motion.section>

      {/* Newsletter / Updates */}
      <motion.section
        className="glass p-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <NewsletterForm />
      </motion.section>

      {/* Contact banner */}
      <motion.section
        className="glass p-6"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-100">Have a question or request?</h3>
            <p className="text-slate-400">Media, events, constructive criticism or collaboration — step into the study.</p>
          </div>
          <Link to="/contact" className="btn btn-ghost focus-ring">Contact</Link>
        </div>
      </motion.section>
    </section>
  );
};

export default Home;

// --- Internal: Newsletter form wired to API ---
const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "exists" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.status === 201) {
        setStatus("success");
        setMessage("You're on the list. Thanks!");
        setEmail("");
      } else if (res.status === 200) {
        // treat 200 as already existed
        setStatus("exists");
        setMessage("You're already subscribed.");
      } else {
        const txt = await res.text();
        setStatus("error");
        setMessage(txt || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-100">Get updates</h3>
          <p className="text-slate-400">New releases, new blog posts, no spam.</p>
        </div>
        <form className="w-full md:w-auto flex gap-2" onSubmit={subscribe}>
          <input
            className="input focus-ring"
            type="email"
            required
            placeholder="you@example.com"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary focus-ring" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Submitting…' : 'Notify me'}
          </button>
        </form>
      </div>
      {message && (
        <div className="mt-2 text-sm" aria-live="polite">{message}</div>
      )}
    </div>
  );
};
