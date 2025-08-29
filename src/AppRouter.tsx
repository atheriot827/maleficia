import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="sticky top-0 z-20 mx-auto mt-4 max-w-5xl px-4 w-full">
          <div className="glass flex items-center justify-between px-5 py-3">
            <NavLink to="/" className="flex items-center gap-3">
              <img src="/assets/logo/moonfire-logo.png" alt="Michael S. Haralson logo" className="h-8 w-auto" />
              <div className="gothic text-2xl text-slate-100">Michael S. Haralson</div>
            </NavLink>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex gap-2">
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
              {/* Mobile menu */}
              <div className="md:hidden">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button aria-label="Open menu" className="btn btn-ghost focus-ring">
                      <Menu size={18} />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content className="glass px-2 py-2 mt-2" align="end">
                    <DropdownMenu.Item asChild>
                      <NavLink className="block px-3 py-2 rounded hover:bg-white/10" to="/" end>Home</NavLink>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <NavLink className="block px-3 py-2 rounded hover:bg-white/10" to="/books">Books</NavLink>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <NavLink className="block px-3 py-2 rounded hover:bg-white/10" to="/blog">Blog</NavLink>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                      <NavLink className="block px-3 py-2 rounded hover:bg-white/10" to="/contact">Contact</NavLink>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
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
};

export default AppRouter;
