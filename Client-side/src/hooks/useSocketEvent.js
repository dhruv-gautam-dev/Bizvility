// src/hooks/useSocketEvent.js
import { useEffect } from "react";
import socket from "../socket";


//  * Custom hook to listen to a socket event and handle cleanup.
//  * @param {string} event - Event name to listen for.
//  * @param {(data: any) => void} callback - Handler when event fires.

export const useSocketEvent = (event, callback) => {
  // console.log(`Inside socketContext.jsx --> Listening to socket event:   ${event} `+ `calback: ${callback}` );
  useEffect(() => {
    socket.on(event, callback);

    return () => {
      socket.off(event, callback); // Clean up listener on unmount
    };
  }, [event, callback]);
};
