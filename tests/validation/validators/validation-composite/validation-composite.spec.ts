import { ValidationComposite } from "@/validation/validators";
import { FieldValidationSpy } from "@/tests/validation/mocks";

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const fieldValidationSpy = new FieldValidationSpy("any_field");
    const fieldValidationSpy2 = new FieldValidationSpy("any_field");
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);
    fieldValidationSpy2.error = new Error("any_error_message");
    const error = sut.validate("any_field", "any_value");
    expect(error).toBe("any_error_message");
  });
});
