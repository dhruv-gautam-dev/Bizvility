// src/hooks/useSocketEvent.js
import { useEffect, useRef } from "react";
import socket from "../socket";

export const useSocketEvent = (event, callback) => {
  
  const callbackRef = useRef(callback); // for latest callback

  // Always use the latest callback to avoid stale closure
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const data = { userId, role };
    const listener = (data) => {
      console.log(`📡 [Socket] Event '${event}' received:`, data);
      callbackRef.current(data);
    };

    const setupListener = () => {
      // Remove any previous listener to avoid duplicates
      socket.off(event, listener);
      socket.on(event, listener);
      console.log(`✅ Listening for socket event '${event}'`);
    };

    // If socket is already connected, set up listener
    if (socket.connected) {
      setupListener();
    }

    // Listen for future connect events
    const handleConnect = () => {
      console.log("🔌 Socket connected:", socket.id);
      socket.emit("register", data); // ensure re-registration
      setupListener();
    };

    socket.on("connect", handleConnect);

    // Clean up on unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off(event, listener);
      console.log(`❌ Removed socket listener for '${event}'`);
    };
  }, [event]);
};
