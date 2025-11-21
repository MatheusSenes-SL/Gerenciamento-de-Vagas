import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { SocketProvider } from "./context/socket";

import App from "./App";

import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </StrictMode>,
);
