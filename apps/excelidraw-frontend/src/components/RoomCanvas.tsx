"use client";
import { useEffect, useState } from "react";
import { WS_URL } from "../../config";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NWU2YzkyZS05NTkxLTQ3YWUtYTMwOC1kZmJmODQyMTkxODgiLCJpYXQiOjE3NDQ5MDc3ODN9.mryqF4yOjn-WsqedVBb-Id0APtlgZVSXFNnypJHBlrM`
    );
    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    };
  }, []);

  if (!socket) {
    return <div>Connecting to server ...</div>;
  }
  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
