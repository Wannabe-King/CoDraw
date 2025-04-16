import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../../components/ChatRoom";
import { error } from "console";

async function getRoomId(slug: string): Promise<string | null> {
  try {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`, {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZmIzZTk0ZS04YjQ3LTQ2NmItYTI5Ny1jMWZjYzQ1ZTQ0MzYiLCJpYXQiOjE3NDQ1NTU0MzJ9.5QYbPzpTwckvuHIRym2P17fXo2M-H0d4H5iQ7LE79JM",
      },
    });
    console.log(response.data);
    const roomId = response.data.roomId;
    if (!roomId) return null;
    return roomId;
  } catch (e) {
    console.log(error.toString());
    return null;
  }
}

export default async function ChatPage(
  {
    // param,
  }: {
    // param: {
    //   slug: string;
    // };
  }
) {
  // const slug = param.slug;
  const slug = "iiit_chat";
  const roomId = await getRoomId(slug);
  console.log(roomId);

  if (roomId) return <ChatRoom id={roomId} />;
  return <div></div>;
}
