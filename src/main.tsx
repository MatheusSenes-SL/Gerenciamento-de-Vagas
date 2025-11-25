import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { SocketProvider } from "./context/socket/provider";

import App from "./App";

import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider address="ws://10.255.255.254:3000">
      <App />
    </SocketProvider>
  </StrictMode>,
);
