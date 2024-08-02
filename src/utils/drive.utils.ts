import { getDrive } from "../config/drive.config";

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

const getFileStream = async (fileId: string) => {
  try {
    const res = await drive.files.get(
      { alt: "media", fileId },
      { responseType: "stream", retry: true, retryConfig: { retry: 2 } },
    );
    return res.data;
  } catch (err) {
    console.error(`Error occured in getFileStream. fileId: ${fileId}`);
    throw err;
  }
};

export { addPermission, getFileStream };
