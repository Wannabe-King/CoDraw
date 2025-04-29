import axios from "axios";
import { BACKEND_URL } from "../../config";

export async function getExistingShapes(roomId: string) {
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
    console.log(`testing ${messages[0].message}`);
    const shapes = messages.map((shape: { message: string }) => {
      const messageData = JSON.parse(shape.message);
      return messageData.shape;
    });
    return shapes;
  }