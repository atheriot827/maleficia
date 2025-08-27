import * as React from 'react';
import { motion } from 'framer-motion';

type Comment = { name: string; comment: string; date?: string };

const Blog: React.FC = () => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [name, setName] = React.useState('');
  const [comment, setComment] = React.useState('');

  // Load existing comments once
  React.useEffect(() => {
    fetch('/api/comments')
      .then(r => r.json())
      .then((items: Comment[]) => {
        console.log('[Comments] loaded:', items.length);
        setComments(items);
      })
      .catch(err => console.error('[Comments] load failed:', err));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !comment) return;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comment })
      });
      if (!res.ok) {
        console.error('Server error:', res.status, res.statusText);
        return;
      }
      const saved: Comment = await res.json();
      console.log('[Comments] saved:', saved);
      setComments(prev => [...prev, saved]);   // update UI without reload
      setName('');
      setComment('');
    } catch (err) {
      console.error('[Comments] network error:', err);
    }
  }

  return (
    <motion.section
      className="mx-auto max-w-2xl px-4 py-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-2">Blog</h2>
      <p className="text-gray-400 mb-8">Latest thoughts from the stormfront.</p>

      <article className="mb-10 p-5 bg-gray-900/60 border border-gray-800 rounded">
        <h3 className="text-2xl font-semibold mb-2">When the Sirens Call</h3>
        <p className="text-gray-400 text-sm mb-4">Posted on 2025-08-23</p>
        <div className="space-y-3 mb-6">
          <p>The sky blackened at 3:07 pm. The first rumble felt like memory...</p>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <h4 className="text-xl font-semibold mb-3">Comments</h4>

          <div className="space-y-3 mb-4">
            {comments.map((c, i) => (
              <div key={i} className="p-3 bg-gray-900/50 border border-gray-800 rounded">
                <div><span className="font-semibold">{c.name}</span> <span className="text-gray-400 text-sm">says:</span></div>
                <div className="ml-1">{c.comment}</div>
                <div className="text-xs text-gray-500 mt-1">{new Date(c.date || Date.now()).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-2">
            <input
              className="w-full mb-2 p-2 text-gray-900 rounded"
              type="text" placeholder="Your name"
              value={name} onChange={e => setName(e.target.value)} required
            />
            <textarea
              className="w-full mb-2 p-2 text-gray-900 rounded"
              placeholder="Your comment"
              value={comment} onChange={e => setComment(e.target.value)} required
            />
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded" type="submit">
              Post Comment
            </button>
          </form>
        </div>
      </article>
    </motion.section>
  );
};

export default Blog;