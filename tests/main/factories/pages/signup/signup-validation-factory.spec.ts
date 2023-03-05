import {
  ValidationBuilder,
  ValidationComposite,
} from "@/validation/validators";
import { makeSignUpValidation } from "@/main/factories/usecases";

describe("SignupValidationFactory", () => {
  test("Should make makeSignUpValidation with correct validations", () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field("name").required().build(),
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().min(8).build(),
        ...ValidationBuilder.field("passwordConfirmation")
          .required()
          .min(8)
          .build(),
      ])
    );
  });
});
