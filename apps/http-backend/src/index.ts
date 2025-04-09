import express from "express";
import { mainRouter } from "./routes/mainRouter";

const app = express();

app.use(express.json());
app.use("/api/v1/user", mainRouter);

app.listen(3001, () => {
  console.log("HTTP Backend Running");
});
