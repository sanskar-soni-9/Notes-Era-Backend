import { google } from "googleapis";

const scopes = ["https://www.googleapis.com/auth/drive"];
const client = new google.auth.JWT({
  email: process.env.DRIVE_EMAIL,
  key: process.env.DRIVE_KEY,
  scopes,
});

const getDrive = () => google.drive({ version: "v3", auth: client });

export { getDrive };
