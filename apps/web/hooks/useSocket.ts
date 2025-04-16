import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZmIzZTk0ZS04YjQ3LTQ2NmItYTI5Ny1jMWZjYzQ1ZTQ0MzYiLCJpYXQiOjE3NDQ1NTU0MzJ9.5QYbPzpTwckvuHIRym2P17fXo2M-H0d4H5iQ7LE79JM`);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
