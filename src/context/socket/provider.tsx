import { useEffect, useState, type ReactNode } from "react";
import { SocketContext } from "./context";
import { Socket, io } from "socket.io-client";

export type SocketProviderProps = {
  address: string;
  children?: ReactNode;
};

export const SocketProvider = ({ address, children }: SocketProviderProps) => {
  const [socket] = useState<Socket>(
    io(address, {
      autoConnect: false,
      path: "/",
      transports: ["websocket"],
      reconnectionAttempts: 1,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 5000,
    }),
  );

  useEffect(() => {
    console.log("Connecting socket, socket provider mounted");
    socket.connect();

    // socket.io.on("error", (error: any) => {
    //   console.log("Socket error:", error);
    // });
    setTimeout(() => {
      console.log("Is socket connected? " + socket.connected);
    }, 4000);

    socket.on("connect_error", (error: any) => {
      console.log("Connection error: ", error.description);
    });

    socket.io.on("reconnect", () => {
      console.log("Socket reconnected");
    });

    return () => {
      console.log("Disconnecting socket, socket provider unmounted");
      socket.disconnect();
    };
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
