import Premiums from "../models/premiums.model";

const getData = async () => {
  try {
    const result = await Premiums.find({});
    return result;
  } catch (err) {
    console.error("Error occured while getting data.");
    throw err;
  }
};

const getSubjects = async () => {
  try {
    const result = await Premiums.aggregate([
      {
        $group: {
          _id: "$subject",
          document: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$document" },
      },
    ]);
    return result;
  } catch (err) {
    console.error("Error occured while querying structure in getSubjects.");
    throw err;
  }
};

const getFiles = async (
  year: number,
  programme: string,
  branch: string,
  subject: string,
) => {
  try {
    const resFiles = await Premiums.find({
      year: year,
      programme: programme,
      branch: branch,
      subject: subject,
    });
    const files = resFiles.map((file) => {
      if (file.isPaid) return file;
      const link = `${process.env.DRIVE_LINK}?id=${file.fileId}`;
      return {
        year: file.year,
        programme: file.programme,
        branch: file.branch,
        subject: file.subject,
        fileId: file.fileId,
        fileName: file.fileName,
        isPaid: file.isPaid,
        link: link,
      };
    });
    return files;
  } catch (err) {
    console.error("Error occured while getting files in getFiles.");
    throw err;
  }
};

export { getFiles, getSubjects, getData };
