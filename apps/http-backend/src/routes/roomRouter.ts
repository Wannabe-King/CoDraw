import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export const chatRoomRouter: Router = Router();

chatRoomRouter.post("/", auth, async (req, res) => {
  const parsedBody = CreateRoomSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  const userId = req.userId ?? "";
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedBody.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room already exists with this name",
    });
  }
});

chatRoomRouter.get("/chats/:roomId", auth, async (req, res) => {
  const userId = req.userId;
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 50,
  });
  res.json({
    messages,
  });
});
