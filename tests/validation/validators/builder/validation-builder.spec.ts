import {
  RequiredFieldValidation,
  ValidationBuilder,
  EmailValidation,
  MinLenghtValidation,
} from "@/validation/validators";

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const validations = ValidationBuilder.field("any_field").required().build();
    expect(validations).toEqual([new RequiredFieldValidation("any_field")]);
  });

  test("Should return EmailValidation", () => {
    const validations = ValidationBuilder.field("any_field").email().build();
    expect(validations).toEqual([new EmailValidation("any_field")]);
  });

  test("Should return MinLenghtValidation", () => {
    const validations = ValidationBuilder.field("any_field").min(8).build();
    expect(validations).toEqual([new MinLenghtValidation("any_field", 8)]);
  });

  test("Should return a list of validations", () => {
    const validations = ValidationBuilder.field("any_field")
      .required()
      .min(8)
      .email()
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation("any_field"),
      new MinLenghtValidation("any_field", 8),
      new EmailValidation("any_field"),
    ]);
  });
});
