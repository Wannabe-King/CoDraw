import { Router } from "express";
import { userRouter } from "./userRouter";
import { chatRoomRouter } from "./roomRouter";

export const mainRouter: Router = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/room", chatRoomRouter);
