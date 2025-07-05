// src/context/SocketContext.jsx
import { createContext, useEffect } from "react";
import socket from "../socket";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      const userId = localStorage.getItem("userId");
      socket.emit("register", userId); // ✅ important

      socket.on("new_notification", (data) => {
        console.log("📥 New Notification received:", data);
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
