import { createContext, useContext, type ReactNode } from "react";
import { Socket, io } from "socket.io-client";

export const SOCKET_URL = "http://0.0.0.0:3000";

export type SocketContextType = {
  socket: Socket;
};

const context = createContext<SocketContextType>({} as SocketContextType);

const createSocket = () => {
  return io(SOCKET_URL, {
    autoConnect: false,
  });
};

export const useSocket = () => useContext(context);

export const SocketProvider = ({ children }: { children?: ReactNode }) => {
  const socket = createSocket();

  return <context.Provider value={{ socket }}>{children}</context.Provider>;
};
