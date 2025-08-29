# maleficia

Gothic‑themed React + TypeScript site with glassmorphism, animated clouds background, and a simple Node API.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run the client with hot reloading (Webpack Dev Server):

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

To create a development build:

```sh
npm run build-dev
```

## Running

The dev client runs at http://localhost:8080 and proxies API calls to http://localhost:3000.

## Animated Clouds Background

- Component: `src/components/CloudsBackground.tsx`
- Styles: `src/styles.css` (classes `.clouds`, `.clouds-1/2/3` + keyframes)
- Integrated in layout: `src/AppRouter.tsx`
- Motion a11y:
  - Respects system preference: `@media (prefers-reduced-motion: reduce)` hides clouds.
  - Manual toggle in footer persists to `localStorage` (`motion=reduced`).

### Assets

By default, the background uses CDN images:

- `https://s.cdpn.io/15514/clouds_1.png`
- `https://s.cdpn.io/15514/clouds_2.png`
- `https://s.cdpn.io/15514/clouds_3.png`

To host locally instead:

1. Download the three PNGs into `public/assets/clouds/` as `clouds_1.png`, `clouds_2.png`, `clouds_3.png`.
2. In `src/styles.css`, change the three `background-image` URLs from `https://s.cdpn.io/...` to `/assets/clouds/clouds_1.png` etc.
3. If your image widths differ from 1000px/1000px/1579px, adjust the keyframe distances (`background-position` to negative image width) for smooth looping.

Note: `webpack.config.js` sets `css-loader` with `url: false` so `url()` paths are left as‑is and served by the browser.

## Testing

To run unit tests:

```sh
npm test
```
