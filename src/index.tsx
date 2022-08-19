import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PrefectureProvider } from "./providers/PrefectureProvider";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrefectureProvider>
      <App />
    </PrefectureProvider>
  </React.StrictMode>
);
