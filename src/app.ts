import { PrismaPg } from "@prisma/adapter-pg";
import cors from "cors";
import express from "express";

import { PrismaClient } from "./generated/prisma/client";
import { clientRouter } from "./modules/client/client.routes";
import { masterRouter } from "./modules/master/master.routes";
import { tagRouter } from "./modules/tag/tag.routes";
import { userRouter } from "./modules/user/user.routes";
import { errorMiddleware } from "./shared/error/error.middleware";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/master", masterRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/tag", tagRouter);

app.all(/(.*)/, (_, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorMiddleware);

export default app;
