import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("hello");
});

app.all(/(.*)/, (_, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT || 4200, () => {
  console.log("server is running");
});
