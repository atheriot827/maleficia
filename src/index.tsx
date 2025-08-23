import * as React from 'react';
import * as ReactDOM from "react-dom/client"; // <-- use 'react-dom/client' for React 18+

import App from './App';
import "./styles.css";

const mountNode = document.getElementById("app");
if (mountNode) {
  const root = ReactDOM.createRoot(mountNode);
  root.render(<App name="Jane" />);
}
