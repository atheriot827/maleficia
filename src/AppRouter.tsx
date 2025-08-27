import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

const AppRouter = () => (
  <Router>
    <nav className="sticky top-0 z-20 mx-auto mt-4 max-w-5xl px-4">
      <div className="glass flex items-center justify-between px-5 py-3">
        <div className="gothic text-2xl text-slate-100">Michael S. Haralson</div>
        <div className="flex gap-2">
          <Link className="px-3 py-1.5 rounded-md hover:bg-white/10 transition" to="/">Home</Link>
          <Link className="px-3 py-1.5 rounded-md hover:bg-white/10 transition" to="/books">Books</Link>
          <Link className="px-3 py-1.5 rounded-md hover:bg-white/10 transition" to="/blog">Blog</Link>
          <Link className="px-3 py-1.5 rounded-md hover:bg-white/10 transition" to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
);

export default AppRouter;