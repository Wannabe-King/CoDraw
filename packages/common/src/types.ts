import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20).nonempty(),
  name: z.string(),
  password: z.string().nonempty().min(8),
});

export const SignInSchema = z.object({
  username: z.string().min(3).max(20).nonempty(),
  password: z.string().nonempty().min(8),
});

export const CreateRoomSchema = z.object({
  name: z.string().nonempty(),
});

export const ShapeSchema = z.object({
  type: z.string().nonempty(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});
