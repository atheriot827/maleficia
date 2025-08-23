import React from "react";

const TornadoBackground = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
      opacity: 0.15,
      filter: "blur(1px)",
    }}
  >
    <svg viewBox="0 0 400 600" width="100%" height="100%">
      <g>
        <ellipse
          cx="200"
          cy="100"
          rx="120"
          ry="30"
          fill="#fff"
          opacity="0.1"
        >
          <animate
            attributeName="rx"
            values="120;80;120"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="200"
          cy="200"
          rx="90"
          ry="25"
          fill="#fff"
          opacity="0.12"
        >
          <animate
            attributeName="rx"
            values="90;60;90"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="200"
          cy="300"
          rx="60"
          ry="18"
          fill="#fff"
          opacity="0.13"
        >
          <animate
            attributeName="rx"
            values="60;40;60"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse
          cx="200"
          cy="400"
          rx="30"
          ry="10"
          fill="#fff"
          opacity="0.15"
        >
          <animate
            attributeName="rx"
            values="30;15;30"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>
      <g>
        <rect x="195" y="410" width="10" height="120" fill="#fff" opacity="0.08">
          <animate
            attributeName="y"
            values="410;430;410"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  </div>
);

export default TornadoBackground;