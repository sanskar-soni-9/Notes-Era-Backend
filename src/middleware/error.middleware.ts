import { Request, Response } from "express";
const errorHandler = (error: Error, _: Request, __: Response) => {
  if (error) console.error("Error: ", error);
};

export { errorHandler };
