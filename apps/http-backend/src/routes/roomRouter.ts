import { Router } from "express";
import { auth } from "../middlewares/auth";

export const chatRoomRouter: Router = Router();

chatRoomRouter.post("/room", auth, (req, res) => {});
