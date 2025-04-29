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
  try {
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
  } catch (error) {
    res.status(411).send({
      error: error,
    });
  }
});

// chatRoomRouter.get("/shape/:roomId", auth, async (req, res) => {
//   try {
//     const roomId = Number(req.params.roomId);
//     const shapes = await prismaClient.shape.findMany({
//       where: {
//         roomId: roomId,
//       },
//     });
//     res.json({
//       shapes,
//     });
//   } catch (e) {
//     res.status(411).send({
//       error: e,
//     });
//   }
// });

chatRoomRouter.get("/:slug", auth, async (req, res) => {
  const slug = req.params.slug;
  try {
    const room = await prismaClient.room.findFirst({
      where: {
        slug,
      },
    });
    if (!room) {
      res.status(403).send({
        message: "Room with given slug dosen't exists",
      });
      return;
    }
    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).send({
      message: "Slug Error",
    });
  }
});
