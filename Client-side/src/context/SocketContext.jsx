import { createContext, useEffect } from "react";
import socket from "../socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      const userId = localStorage.getItem("userId");
      const role = localStorage.getItem("role");

      if (userId) {
        socket.emit("register", { userId: userId.toString(), role });
      } else {
        console.warn(
          "⚠️ Skipping registration: No userId found in localStorage"
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
