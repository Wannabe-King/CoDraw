import axios from "axios";
import { BACKEND_URL } from "../../config";

//-------------------------------------------OLD Implementation-------------------------------------------------------------

type Shape =
  | {
      type: "Rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "Circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "Pencil";
      x: number;
      y: number;
      endX: number;
      endY: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");

  let existingShapes: Shape[] = await getExistingShapes(roomId);
  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type == "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape.shape);
      clearCanvas(existingShapes, ctx, canvas);
    }
  };
  clearCanvas(existingShapes, ctx, canvas);
  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    // @ts-ignore
    const selectedTool = window.selectedTool;
    let shape: Shape | null = null;
    if (selectedTool == "Rect") {
      shape = {
        type: "Rect",
        x: startX,
        y: startY,
        width,
        height,
      };
    } else if (selectedTool == "Circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "Circle",
        centerX: startX + radius,
        centerY: startY + radius,
        radius: radius,
      };
    }
    if (!shape) {
      return;
    }
    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId,
      })
    );
  });
  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, ctx, canvas);
      ctx.strokeStyle = "rgba(255,255,255)";
      // @ts-ignore
      const selectedTool = window.selectedTool;
      console.log(selectedTool);
      // @ts-ignore
      if (selectedTool == "Circle") {
        ctx.beginPath();
        ctx.arc(
          (startX + width) / 2,
          (startY + height) / 2,
          Math.max(width, height) / 2,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.closePath();
      }
      // @ts-ignore
      else if (selectedTool == "Rect") {
        ctx.strokeRect(startX, startY, width, height);
      }
      // @ts-ignore
      else if (selectedTool == "Pencil") {
      }
    }
  });
}

function clearCanvas(
  existingShapes: Shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    if (shape.type === "Rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "Circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  });
}

async function getExistingShapes(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/room/chats/${roomId}`, {
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZmIzZTk0ZS04YjQ3LTQ2NmItYTI5Ny1jMWZjYzQ1ZTQ0MzYiLCJpYXQiOjE3NDQ1NTU0MzJ9.5QYbPzpTwckvuHIRym2P17fXo2M-H0d4H5iQ7LE79JM",
    },
  });

  if (response.status != 200) {
    return null;
  }
  const messages = response.data.messages;
  console.log(`testing ${messages}`);
  const shapes = messages.map((shape: { message: string }) => {
    const messageData = JSON.parse(shape.message);
    return messageData.shape;
  });
  return shapes;
}
