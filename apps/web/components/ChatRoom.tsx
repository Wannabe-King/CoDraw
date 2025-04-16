import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/room/chats/${roomId}`,{
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZmIzZTk0ZS04YjQ3LTQ2NmItYTI5Ny1jMWZjYzQ1ZTQ0MzYiLCJpYXQiOjE3NDQ1NTU0MzJ9.5QYbPzpTwckvuHIRym2P17fXo2M-H0d4H5iQ7LE79JM",
    },
  });
  return response.data.messages;
}

export default async function ChatRoom({ id }: { id: string }) {
  const messages = await getChats(id);
  return <ChatRoomClient id={id} messages={messages} />;
}
