import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

const AppRouter = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-20 mx-auto mt-4 max-w-5xl px-4 w-full">
        <div className="glass flex items-center justify-between px-5 py-3">
          <div className="gothic text-2xl text-slate-100">Michael S. Haralson</div>
          <div className="flex gap-2">
            <NavLink
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`
              }
              to="/"
              end
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`
              }
              to="/books"
            >
              Books
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`
              }
              to="/blog"
            >
              Blog
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition ${isActive ? 'bg-white/15' : 'hover:bg-white/10'}`
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
