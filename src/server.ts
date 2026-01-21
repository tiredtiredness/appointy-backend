import dotenv from "dotenv";

import app from "./app";

dotenv.config();

const HOST = process.env.HOST || "localhost";
const PORT = Number.parseInt(process.env.PORT || "4200");

app.listen(PORT, HOST, () => {
  console.log(`Server is running at ${HOST}:${PORT}`);
});
