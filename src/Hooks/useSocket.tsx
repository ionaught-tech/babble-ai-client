import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

const useSocket = (
  canConnect: boolean | null,
  tokenKey: string,
  socketUrl: string,
) => {
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (!canConnect || socketRef.current) return;
    const connection = io(socketUrl, {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
      },
    });
    socketRef.current = connection;
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [canConnect]);

  return socketRef;
};

export default useSocket;
