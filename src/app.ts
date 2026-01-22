import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { errorMiddleware } from "./lib/error/error.middleware";
import { authRouter } from "./modules/auth/auth.routes";
import { passportLib } from "./modules/auth/auth.strategy";
import { clientRouter } from "./modules/client/client.routes";
import { masterRouter } from "./modules/master/master.routes";
import { tagRouter } from "./modules/tag/tag.routes";
import { userRouter } from "./modules/user/user.routes";

const app = express();

app.use(
  cors({
    origin: process.env.WEB_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(passportLib.initialize());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/master", masterRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/tag", tagRouter);

app.all(/(.*)/, (_, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorMiddleware);

export default app;
