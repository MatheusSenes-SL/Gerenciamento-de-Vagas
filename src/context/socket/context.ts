import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export type SocketContextType = Socket;
export const SocketContext = createContext<SocketContextType>(
  null as unknown as SocketContextType,
);

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("SocketContext is not initialized");
  }

  return socket;
};
