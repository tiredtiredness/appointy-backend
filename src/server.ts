import dotenv from "dotenv";

import app from "./app";
import { disconnectPrisma } from "./configs/db";

dotenv.config();

const HOST = process.env.HOST || "localhost";
const PORT = Number.parseInt(process.env.PORT || "4200");

process.on("SIGINT", async () => {
  await disconnectPrisma();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectPrisma();
  process.exit(0);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at ${HOST}:${PORT}`);
});
