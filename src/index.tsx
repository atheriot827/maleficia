import * as React from 'react';
import * as ReactDOM from "react-dom/client";
import AppRouter from './AppRouter';
import "./styles.css";

const mountNode = document.getElementById("app");
if (mountNode) {
  const root = ReactDOM.createRoot(mountNode);
  root.render(<AppRouter />);
}
