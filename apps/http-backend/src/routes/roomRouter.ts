import { Router } from "express";
import { auth } from "../middlewares/auth";
import { CreateRoomSchema } from "@repo/common/types";

export const chatRoomRouter: Router = Router();

chatRoomRouter.post("/room", auth, (req, res) => {
  const parsedBody = CreateRoomSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(404).send({
      message: "Invalid chat room credentials",
    });
    return;
  }
});
