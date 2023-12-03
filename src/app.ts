import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import premiumRouter from "./routes/premium.router.js";
import subscriptionRouter from "./routes/subscription.router.js";
import { connectDB } from "./config/mongodb.config.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://127.0.0.1:3001",
      "https://notesera.in",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/premium", premiumRouter);
app.use("/api/subscribe", subscriptionRouter);

app.use(errorHandler);

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`);
  });

  process.on("unhandledRejection", (error) => {
    console.log(`Logged Error: ${error}.`);
    server.close(() => process.exit());
  });
});
