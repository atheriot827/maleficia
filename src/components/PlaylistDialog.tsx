import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Headphones } from 'lucide-react';

const PlaylistDialog: React.FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn btn-ghost focus-ring inline-flex items-center gap-2" aria-haspopup="dialog">
          <Headphones size={16} />
          Birthrite Playlists
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass p-4 w-[95vw] max-w-4xl max-h-[85vh] overflow-auto">
          <div className="flex items-start justify-between mb-3">
            <Dialog.Title className="text-xl font-semibold">Birthrite Playlists</Dialog.Title>
            <Dialog.Close className="btn btn-ghost focus-ring">Close</Dialog.Close>
          </div>

          <p className="text-slate-400 mb-4">Soundtracks to set the mood for reading.</p>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Spotify */}
            <div className="glass p-2">
              <div className="text-sm text-slate-300 mb-2">Spotify — Birthrite</div>
              <iframe
                title="Spotify playlist"
                style={{ borderRadius: 12 }}
                src="https://open.spotify.com/embed/playlist/30qYKjnuabeFZUuZ5cs46z?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>

            {/* Apple Music */}
            <div className="glass p-2">
              <div className="text-sm text-slate-300 mb-2">Apple Music — Birthrite</div>
              <iframe
                title="Apple Music playlist"
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                height="352"
                style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', borderRadius: 12 }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.music.apple.com/us/playlist/birthrite/pl.u-V9D7v0aI1Mdra3"
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PlaylistDialog;

