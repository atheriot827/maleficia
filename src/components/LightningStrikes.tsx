import * as React from 'react';

type Props = {
  /** min delay between strikes in ms */
  minDelay?: number;
  /** max delay between strikes in ms */
  maxDelay?: number;
  /** number of recursive subdivisions per main bolt */
  detail?: number;
};

// Simple fractal bolt generator (2D) with optional forks.
function generateBolt(
  start: [number, number],
  end: [number, number],
  detail: number,
  jitter: number,
  forks: number
) {
  const main = subdivide(start, end, detail, jitter);
  const branches: Array<Array<[number, number]>> = [];
  if (forks > 0) {
    for (let i = 0; i < forks; i++) {
      const idx = Math.floor(Math.random() * (main.length - 2)) + 1;
      const forkStart = main[idx];
      const dirX = main[idx + 1][0] - forkStart[0];
      const dirY = main[idx + 1][1] - forkStart[1];
      const len = Math.hypot(dirX, dirY) || 1;
      const nx = -dirY / len;
      const ny = dirX / len;
      const mag = (Math.random() * 100 + 80) * (0.6 + Math.random() * 0.4);
      const forkEnd: [number, number] = [forkStart[0] + nx * mag, forkStart[1] + ny * mag];
      branches.push(subdivide(forkStart, forkEnd, Math.max(1, detail - 1), jitter * 0.7));
    }
  }
  return { main, branches };
}

function subdivide(
  a: [number, number],
  b: [number, number],
  detail: number,
  jitter = 40
): Array<[number, number]> {
  if (detail <= 0) return [a, b];
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const disp = (Math.random() * 2 - 1) * jitter;
  const mid: [number, number] = [mx + nx + nx * disp, my + ny + ny * disp];
  const left = subdivide(a, mid, detail - 1, jitter * 0.6);
  const right = subdivide(mid, b, detail - 1, jitter * 0.6);
  // merge without duplicating mid
  return [...left.slice(0, -1), ...right];
}

const LightningStrikes: React.FC<Props> = ({ minDelay = 800, maxDelay = 3500, detail = 6 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const timeoutRef = React.useRef<number | null>(null);
  const reduceMotion = React.useRef<boolean>(false);

  // Resize canvas to device pixels
  const resize = React.useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width = Math.floor(window.innerWidth * dpr);
    c.height = Math.floor(window.innerHeight * dpr);
    c.style.width = `${window.innerWidth}px`;
    c.style.height = `${window.innerHeight}px`;
    const ctx = c.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const manual = document.body.getAttribute('data-motion') === 'reduced';
    reduceMotion.current = mq.matches || manual;
    const onChange = (e: MediaQueryListEvent) => { reduceMotion.current = e.matches || document.body.getAttribute('data-motion') === 'reduced'; };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  React.useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  const schedule = React.useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    const delay = Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
    timeoutRef.current = window.setTimeout(() => strike(), delay) as unknown as number;
  }, [minDelay, maxDelay]);

  const strike = React.useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    if (reduceMotion.current) { schedule(); return; }

    // ensure a clean, fully transparent canvas before each strike
    ctx.clearRect(0, 0, c.width, c.height);

    const startX = Math.random() * window.innerWidth;
    const startY = -20; // start slightly above viewport
    const endX = startX + (Math.random() * 200 - 100);
    const endY = window.innerHeight * (0.65 + Math.random() * 0.25);
    const { main, branches } = generateBolt([startX, startY], [endX, endY], detail, 40, Math.random() < 0.8 ? 2 : 1);

    // outer glow
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawPath = (pts: Array<[number, number]>, color: string, width: number, shadow = 0, shadowColor?: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.shadowBlur = shadow;
      if (shadowColor) ctx.shadowColor = shadowColor;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    };

    // toned-down glow and core
    drawPath(main, 'rgba(80,180,255,0.25)', 5, 12, 'rgba(80,180,255,0.6)');
    branches.forEach(b => drawPath(b, 'rgba(80,180,255,0.18)', 3.5, 8, 'rgba(80,180,255,0.5)'));
    // core
    drawPath(main, 'rgba(255,255,255,0.85)', 1.6);
    branches.forEach(b => drawPath(b, 'rgba(255,255,255,0.7)', 1.2));

    ctx.restore();

    // clear quickly so strikes disappear at random
    const clearDelay = 90 + Math.random() * 120; // 90–210ms
    window.setTimeout(() => {
      ctx.clearRect(0, 0, c.width, c.height);
    }, clearDelay);

    // occasionally do a rapid second strike
    if (Math.random() < 0.35) {
      const echoDelay = 120 + Math.random() * 180; // 120–300ms
      window.setTimeout(() => {
        // draw a fainter echo towards a nearby target
        const eStartX = startX + (Math.random() * 60 - 30);
        const eEndX = eStartX + (Math.random() * 140 - 70);
        const eEndY = endY * (0.9 + Math.random() * 0.1);
        const { main: m2, branches: b2 } = generateBolt([eStartX, startY], [eEndX, eEndY], Math.max(3, detail - 2), 30, 1);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const draw = (pts: Array<[number, number]>, color: string, width: number, shadow = 0, shadowColor?: string) => {
          ctx.strokeStyle = color; ctx.lineWidth = width; ctx.shadowBlur = shadow; if (shadowColor) ctx.shadowColor = shadowColor;
          ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke();
        };
        draw(m2, 'rgba(80,180,255,0.2)', 4, 10, 'rgba(80,180,255,0.6)');
        b2.forEach(seg => draw(seg, 'rgba(80,180,255,0.14)', 2.5, 6, 'rgba(80,180,255,0.4)'));
        draw(m2, 'rgba(255,255,255,0.75)', 1.4);
        ctx.restore();
        const echoClear = 70 + Math.random() * 120;
        window.setTimeout(() => ctx.clearRect(0, 0, c.width, c.height), echoClear);
      }, echoDelay);
    }

    schedule();
  }, [detail, schedule]);

  React.useEffect(() => {
    schedule();
    return () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); if (rafRef.current) window.cancelAnimationFrame(rafRef.current); };
  }, [schedule]);

  return (
    <div className="lightning-overlay" aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default LightningStrikes;
