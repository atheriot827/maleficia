import * as React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { SiSpotify, SiApplemusic } from 'react-icons/si';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const [motionReduced, setMotionReduced] = React.useState(false);

  React.useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('motion');
    const reduced = saved === 'reduced';
    setMotionReduced(reduced);
    if (reduced) document.body.setAttribute('data-motion', 'reduced');
  }, []);

  React.useEffect(() => {
    if (motionReduced) {
      document.body.setAttribute('data-motion', 'reduced');
      localStorage.setItem('motion', 'reduced');
    } else {
      document.body.removeAttribute('data-motion');
      localStorage.setItem('motion', 'normal');
    }
  }, [motionReduced]);

  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="glass my-6 px-5 py-4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-sm text-slate-400">© {year} Michael S. Haralson</span>
            <div className="flex items-center gap-3" aria-label="Social links">
              <a className="p-2 rounded-md hover:bg-white/10 focus-ring" href="https://www.facebook.com/profile.php?id=100092259976470" target="_blank" rel="noreferrer noopener" aria-label="Facebook">
                <Facebook size={24} className="text-slate-300" />
              </a>
              <a className="p-2 rounded-md hover:bg-white/10 focus-ring" href="https://www.instagram.com/samspade685/" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
                <Instagram size={24} className="text-slate-300" />
              </a>
              <a className="p-2 rounded-md hover:bg-white/10 focus-ring" href="https://open.spotify.com/playlist/30qYKjnuabeFZUuZ5cs46z?si=hG8mIK6lS2CwKEE0IzH2Vw&nd=1&dlsi=abfa39d97eaf4cab" target="_blank" rel="noreferrer noopener" aria-label="Spotify">
                <SiSpotify size={24} className="text-slate-300" />
              </a>
              <a className="p-2 rounded-md hover:bg-white/10 focus-ring" href="https://music.apple.com/us/playlist/birthrite/pl.u-V9D7v0aI1Mdra3" target="_blank" rel="noreferrer noopener" aria-label="Apple Music">
                <SiApplemusic size={24} className="text-slate-300" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button
              className="btn btn-ghost focus-ring text-sm"
              onClick={() => setMotionReduced(v => !v)}
              aria-pressed={motionReduced}
            >
              {motionReduced ? 'Enable Motion' : 'Reduce Motion'}
            </button>
            {/* Optional tiny badge can be re-purposed. Remove if undesired. */}
            {/* <span className="badge-glass">Reading Mode</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
