import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("error", (e) => {
    console.error;
  });
  ws.on("message", function message(data) {
    console.log("recieved %s", data);
    ws.send("pong");
  });
});
