import { InvalidFieldError } from "@/validation/errors";
import { CompareFieldsValidation } from "@/validation/validators";

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare);

describe("CompareFieldsValidation", () => {
  test("Should return error if compare is invalid", () => {
    const field = "field";
    const fieldToCompare = "other_field";
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: "any_value",
      [fieldToCompare]: "other_value",
    });
    expect(error).toEqual(new InvalidFieldError("field"));
  });

  test("Should return falsy if compare is valid", () => {
    const field = "any_field";
    const fieldToCompare = "any_field";
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: "any_value",
      [fieldToCompare]: "any_value",
    });
    expect(error).toBeFalsy();
  });
});
