import ModulePurchase, {
  ModulePurchaseInput,
} from "../models/modulePurchase.model";

const addModulePurchase = async (purchase: ModulePurchaseInput) => {
  await ModulePurchase.create(purchase);
};

export { addModulePurchase };
