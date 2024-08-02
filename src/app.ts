import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes";
import { connectDB } from "./config/mongodb.config";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      process.env.NODE_ENV === "prod"
        ? process.env.FRONTEND_URL!
        : process.env.LOCALHOST_URL!,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(router);
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
