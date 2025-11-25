import { useEffect, useState, type ReactNode } from "react";
import { SocketContext } from "./context";

export type SocketProviderProps = {
  address: string;
  children?: ReactNode;
};

export const SocketProvider = ({ address, children }: SocketProviderProps) => {
  const [socket] = useState<WebSocket>(() => new WebSocket(address));

  useEffect(() => {
    console.log("Connecting WebSocket, provider mounted");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onerror = (err) => {
      console.log("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    setTimeout(() => {
      console.log("Is socket connected? " + (socket.readyState === WebSocket.OPEN));
    }, 4000);

    return () => {
      console.log("Disconnecting WebSocket, provider unmounted");
      socket.close();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
