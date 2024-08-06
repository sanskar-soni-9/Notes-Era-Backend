import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";

const scopes = ["https://www.googleapis.com/auth/drive"];

const email = Buffer.from(process.env.DRIVE_EMAIL!, "base64").toString("utf8");
const key = Buffer.from(process.env.DRIVE_KEY!, "base64")
  .toString("utf8")
  .replace(/\\n/g, "\n");

const client = new google.auth.JWT({
  email,
  key,
  scopes,
});

const getDrive = () => google.drive({ version: "v3", auth: client });

export { getDrive };
