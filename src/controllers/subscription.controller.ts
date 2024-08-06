import { NextFunction, Request, Response } from "express";
import { addSubscription } from "../services/subscription.service";

const handleSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  if (!email) {
    res.json({
      isErr: true,
      message: "Email can not be null or undefined",
      status: "error",
    });
    return;
  }
  try {
    await addSubscription(email);
    res.json({
      isErr: false,
      message: "Subscription added successfully",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      isErr: true,
      message: "Internal Error occured while adding subscription",
      status: "error",
    });

    console.error("Error occured in handleSubscription.");
    next(err);
  }
};

export { handleSubscription };
