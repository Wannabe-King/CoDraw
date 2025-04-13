import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SignInSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
import { auth } from "../middlewares/auth";

export const userRouter: Router = Router();

const SALT_ROUNDS = 3;

userRouter.post("/signup", async (req, res) => {
  const parsedBody = CreateUserSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(404).send({
      message: "Invalid Input ",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(
    parsedBody.data.password,
    SALT_ROUNDS
  );
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedBody.data.username,
        name: parsedBody.data.name,
        password: hashedPassword,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (e) {
    res.status(411).send({
      message: "User already registerd",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const parsedBody = SignInSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(404).send({
      message: "Invalid Input ",
    });
    return;
  }
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: parsedBody.data.username,
      },
    });
    if (!user) {
      res.status(403).json({
        message: "Not authorized",
      });
      return;
    }
    const result = await bcrypt.compare(
      parsedBody.data.password,
      user.password
    );
    if (result) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        JWT_SECRET
      );
      res.send({
        token,
      });
    } else {
      res.status(403).send({
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    res.status(411).send({
      message: "Some Error occured while signin",
    });
  }
});

userRouter.post("/createRoom", auth, async (req, res) => {
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
