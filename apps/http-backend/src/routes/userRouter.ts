import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const userRouter: Router = Router();

userRouter.post("/signup", (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;
});

userRouter.post("/signin", (req, res) => {
  const token = jwt.sign("1", JWT_SECRET);
});

userRouter.post("/createRoom", (req, res) => {});
