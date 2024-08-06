import Subscription, { SubscriptionInput } from "../models/subscriptions.model";

const findSubscription = async (email: string) => {
  try {
    return await Subscription.findOne({ email: email });
  } catch (err) {
    console.error("Error occured while finding user in findUser.");
    throw err;
  }
};

const addSubscription = async (email: string) => {
  try {
    const userInput: SubscriptionInput = {
      email,
    };

    return await Subscription.updateOne({ email }, userInput, { upsert: true });
  } catch (err) {
    console.error("Error occured while finding user in findUser.");
    throw err;
  }
};

export { addSubscription, findSubscription };
