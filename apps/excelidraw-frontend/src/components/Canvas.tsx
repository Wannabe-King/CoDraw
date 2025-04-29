import { Game } from "@/draw/Game";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, Square } from "lucide-react";

export type Tool = "Circle" | "Rect" | "Pencil";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<Tool>("Rect");
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    game?.setTool(selected);
  }, [selected, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const g = new Game(canvas, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div className="overflow-hidden flex justify-center">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <div className="p-1.5 rounded-md absolute bg-stone-800 top-10">
        <ul className="flex">
          <li className="mx-2 ">
            <IconButton
              icon={<Square size={20} />}
              onClick={() => {
                setSelected("Rect");
              }}
              activated={selected == "Rect"}
            />
          </li>
          <li className="mx-2 ">
            <IconButton
              icon={<Circle size={20} />}
              onClick={() => {
                setSelected("Circle");
              }}
              activated={selected == "Circle"}
            />
          </li>
          <li className="mx-2 ">
            <IconButton
              icon={<Pencil size={20} />}
              onClick={() => {
                setSelected("Pencil");
              }}
              activated={selected == "Pencil"}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
