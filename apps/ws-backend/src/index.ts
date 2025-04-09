import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    return;
  }
  console.log("url: ", ws.url);
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  if (!token) {
    return;
  }
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (!decoded || !decoded.userId) {
    ws.close();
    return;
  }
  ws.on("error", (e) => {
    console.error;
  });
  ws.on("message", function message(data) {
    console.log("recieved %s", data);
    ws.send("pong");
  });
});
