import * as React from 'react';
import { Github, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="glass my-6 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">© {year} Michael S. Haralson</span>
            <span className="badge-glass">Gothic + Glass</span>
          </div>

          <nav aria-label="Social links">
            <ul className="flex items-center gap-3">
              <li>
                <a className="p-2 rounded-md hover:bg-white/10 focus-ring" href="https://twitter.com" target="_blank" rel="noreferrer noopener" aria-label="Twitter">
                  <Twitter size={18} className="text-slate-300" />
                </a>
              </li>
              <li>
                <a className="p-2 rounded-md hover:bg-white/10 focus-ring" href="https://github.com" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
                  <Github size={18} className="text-slate-300" />
                </a>
              </li>
              <li>
                <a className="p-2 rounded-md hover:bg-white/10 focus-ring" href="mailto:author@example.com" aria-label="Email">
                  <Mail size={18} className="text-slate-300" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
