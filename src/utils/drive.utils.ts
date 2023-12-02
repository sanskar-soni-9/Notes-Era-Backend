import { getDrive } from "../config/drive.config.js";

const drive = getDrive();

const addPermission = async (userEmail: string, fileId: string) => {
  try {
    const res = await drive.permissions.create({
      fileId,
      requestBody: { type: "user", emailAddress: userEmail, role: "reader" },
    });
    res && console.log(`Added user: ${userEmail} to ${fileId}.`);
  } catch (err) {
    console.error("Error occured in adding user in addPermission.");
    throw err;
  }
};

const getFile = async (fileId: string) => {
  try {
    const res = await drive.files.get({
      fileId: fileId,
      fields: "webContentLink",
    });
    console.log("Got file.", res.data.webContentLink);
    return res.data.webContentLink;
  } catch (err) {
    console.error(`Error occured while getting file: ${fileId}`);
    throw err;
  }
};

export { addPermission, getFile };
