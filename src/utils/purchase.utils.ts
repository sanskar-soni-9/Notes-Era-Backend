import Purchase, { PurchaseInput } from "../models/purchase.model";

const findUser = async (email: string) => {
  try {
    return await Purchase.findOne({ email: email });
  } catch (err) {
    console.error("Error occured while finding user in findUser.");
    throw err;
  }
};

const createUser = async (email: string, fileId: string) => {
  try {
    const userInput: PurchaseInput = {
      email,
      files: [fileId],
    };
    await Purchase.create(userInput);
  } catch (err) {
    console.error("Error occured while adding user in createUser.");
    throw err;
  }
};

const addFileId = async (email: string, fileId: string) => {
  try {
    await Purchase.updateOne({ email }, { $addToSet: { files: fileId } });
  } catch (err) {
    console.error("Error occured while adding fileId in addFileId.");
    throw err;
  }
};

export { findUser, createUser, addFileId };
