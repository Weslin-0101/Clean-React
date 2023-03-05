import {
  ValidationBuilder,
  ValidationComposite,
} from "@/validation/validators";

export const makeSignUpValidation = (): ValidationComposite => {
  return new ValidationComposite([
    ...ValidationBuilder.field("name").required().build(),
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(8).build(),
    ...ValidationBuilder.field("passwordConfirmation")
      .required()
      .min(8)
      .build(),
  ]);
};
