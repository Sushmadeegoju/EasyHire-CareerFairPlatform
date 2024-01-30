import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import "./frontend/css/index.css";
import App from "./frontend/components/App";
import reportWebVitals from "./tests/reportWebVitals";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
