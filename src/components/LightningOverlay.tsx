import React, { useEffect, useState } from "react";

const lightningBolts = [
  // Array of SVG path data for different lightning shapes
  "M60 0 L70 40 L50 35 L80 100 L60 90 L90 180",
  "M120 0 L130 30 L110 25 L140 80 L120 70 L150 150",
  "M200 0 L210 50 L190 45 L220 120 L200 110 L230 200",
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const LightningOverlay = () => {
  const [show, setShow] = useState(false);
  const [bolt, setBolt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBolt(getRandomInt(lightningBolts.length));
      setShow(true);
      setTimeout(() => setShow(false), 200 + Math.random() * 200); // flash duration
    }, 4000 + Math.random() * 4000); // random interval between flashes
    return () => clearInterval(interval);
  }, []);

  return show ? (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        pointerEvents: "none",
        opacity: 0.8,
        filter: "drop-shadow(0 0 16px #fff) drop-shadow(0 0 32px #f00)",
        transition: "opacity 0.2s",
      }}
      viewBox="0 0 300 200"
    >
      <path
        d={lightningBolts[bolt]}
        stroke="#fff"
        strokeWidth="6"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={lightningBolts[bolt]}
        stroke="#ff0000"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  ) : null;
};

export default LightningOverlay;