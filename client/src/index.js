import React from "react";
import App from "./components/App";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);
