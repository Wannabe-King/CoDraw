import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SignInSchema } from "@repo/common/types";

export const userRouter: Router = Router();

userRouter.post("/signup", (req, res) => {
  const parsedBody = CreateUserSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(404).send({
      message: "Invalid Input ",
    });
    return;
  }
});

userRouter.post("/signin", (req, res) => {
  const parsedBody = SignInSchema.safeParse(req.body);
  const token = jwt.sign("1", JWT_SECRET);
});

userRouter.post("/createRoom", (req, res) => {});
