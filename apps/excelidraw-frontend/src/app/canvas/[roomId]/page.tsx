"use client";
import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      initDraw(canvas);
    }
  }, [canvasRef]);
  return (
    <div className="bg-white w-screen h-screen">
      <canvas ref={canvasRef} width={2000} height={1000}></canvas>
    </div>
  );
}
