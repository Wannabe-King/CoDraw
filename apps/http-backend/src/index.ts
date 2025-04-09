import express from "express";
import { userRouter } from "./routes/userRouter";

const app = express();

app.use(express.json());
app.use("/api/v1", userRouter);

app.listen(3001, () => {
  console.log("HTTP Backend Running");
});
