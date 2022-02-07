import { object, number } from "yup";

export const PledgeFormSchema = object().shape({
  amount: number().typeError("Required").moreThan(0)
});
