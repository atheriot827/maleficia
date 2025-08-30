const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
// Parse JSON request bodies sent from fetch()
app.use(express.json());
// Parse URL-encoded bodies (HTML form posts)
app.use(express.urlencoded({ extended: false }));
// Allow local dev from webpack dev server (proxy). 
app.use(cors());

// ---------- "Database" (training wheels) ----------
// In-memory arrays (data disappears when the server restarts).
// swap these for a real DB later.
const comments = []; // { name, comment, postId, date }
const messages = []; // { name, email, message, date }
let subscribers = []; // loaded from disk

// Persist newsletter subscribers to disk (basic, replace with real provider later)
const DATA_DIR = path.join(__dirname, 'data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(SUBSCRIBERS_FILE)) fs.writeFileSync(SUBSCRIBERS_FILE, '[]', 'utf8');
}

function loadSubscribers() {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
    subscribers = JSON.parse(raw);
  } catch (e) {
    console.error('[API] Failed to load subscribers:', e.message);
    subscribers = [];
  }
}

function saveSubscribers() {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf8');
  } catch (e) {
    console.error('[API] Failed to save subscribers:', e.message);
  }
}

loadSubscribers();

// ---------- Routes ----------

// Health check (quick way to see if server is up)
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Get comments (optionally filter by postId using ?postId=xyz)
app.get('/api/comments', (req, res) => {
  const { postId } = req.query;
  const data = postId ? comments.filter(c => c.postId === postId) : comments;
  console.log('[API] GET /api/comments ->', data.length, 'items'); // LOG
  res.json(data);
});

// Post a new comment
app.post('/api/comments', (req, res) => {
  const { name, comment, postId } = req.body;

  // Basic validation
  if (!name || !comment) {
    return res.status(400).json({ error: 'Name and comment are required.' });
  }

  // Build the comment object
  const item = {
    name,
    comment,
    postId: postId || null,
    date: new Date().toISOString(),
  };

  // Save to our "DB"
  comments.push(item);
  console.log('[API] New comment:', item); // LOG

  // Respond with what we stored
  res.status(201).json(item);
});

// Newsletter subscribe (file-based)
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).send('A valid email is required.');
  }
  const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(200).send('Already subscribed.');
  }
  const sub = { email, createdAt: new Date().toISOString() };
  subscribers.push(sub);
  saveSubscribers();
  console.log('[API] Newsletter subscribed:', sub);
  return res.status(201).send('Subscribed.');
});

// Contact (store + email)
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields required.');
  }

  const entry = { name, email, message, date: new Date().toISOString() };
  messages.push(entry);
  console.log('[API] Contact message:', entry); // LOG

  // --- Email (enable after installing nodemailer) ---
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTHOR_EMAIL,
        pass: process.env.AUTHOR_APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: email,
      to: process.env.AUTHOR_EMAIL,
      subject: `New message from ${name} (Maleficia)`,
      text: `${name} <${email}> wrote:\n\n${message}\n\n---\n${entry.date}`,
    };
    await transporter.sendMail(mailOptions);
    console.log('[API] Contact email sent'); // LOG
  } catch (err) {
    console.error('[API] Email error:', err.message);
    return res.status(500).send('Failed to send message. Please try again later.');
  }

  // For now, even without email, confirm success
  res.status(200).send('Message received. (Email sending not yet enabled)');
});

// ---------- Static files (production only) ----------
// If you build your React app to /dist, serve it in production:
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));

  // SPA fallback: always return index.html for client routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ---------- Start the server ----------
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
