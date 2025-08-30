import * as React from 'react';

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
    <section className="mx-auto max-w-2xl px-4 py-10">
      <div className="glass p-6 mb-6">
        <h2 className="text-3xl font-bold mb-2 text-slate-100">Blog</h2>
        <p className="text-slate-400">Latest thoughts from the stormfront.</p>
      </div>

      <article className="glass p-5 mb-8">
        <h3 className="text-2xl font-semibold mb-2 text-slate-100">When the Sirens Call</h3>
        <p className="text-slate-400 text-sm mb-4">Posted on 2025-08-23</p>
        <div className="space-y-3 mb-6 text-slate-200">
          <p>The sky blackened at 3:07 pm. The first rumble felt like memory...</p>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="text-xl font-semibold mb-3 text-slate-100">Comments</h4>

          <div className="space-y-3 mb-4">
            {comments.map((c, i) => (
              <div key={i} className="glass p-3">
                <div><span className="font-semibold">{c.name}</span> <span className="text-slate-400 text-sm">says:</span></div>
                <div className="ml-1 text-slate-200">{c.comment}</div>
                <div className="text-xs text-slate-500 mt-1">{new Date(c.date || Date.now()).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-2">
            <input
              className="input mb-2 focus-ring"
              type="text" placeholder="Your name"
              value={name} onChange={e => setName(e.target.value)} required
            />
            <textarea
              className="input mb-2 focus-ring"
              placeholder="Your comment"
              value={comment} onChange={e => setComment(e.target.value)} required
            />
            <button className="btn btn-primary focus-ring" type="submit">
              Post Comment
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Blog;
