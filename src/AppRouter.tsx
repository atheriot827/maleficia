import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import LightningOverlay from "./components/LightningOverlay";

const AppRouter = () => (
  <Router>
    <LightningOverlay />
    <div className="lightning" />
    <nav className="relative z-10 p-6 bg-black flex gap-8 justify-center border-b border-red-900 shadow-lg">
      <Link className="text-red-500 hover:text-red-300 text-xl font-bold transition-all duration-300" to="/">Home</Link>
      <Link className="text-red-500 hover:text-red-300 text-xl font-bold transition-all duration-300" to="/books">Books</Link>
      <Link className="text-red-500 hover:text-red-300 text-xl font-bold transition-all duration-300" to="/blog">Blog</Link>
      <Link className="text-red-500 hover:text-red-300 text-xl font-bold transition-all duration-300" to="/contact">Contact</Link>
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