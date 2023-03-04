import { InvalidFieldError } from "@/validation/errors";
import { CompareFieldsValidation } from "@/validation/validators";

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation("field", valueToCompare);

describe("CompareFieldsValidation", () => {
  test("Should return error if compare is invalid", () => {
    const sut = makeSut("any_value");
    const error = sut.validate("other_value");
    expect(error).toEqual(new InvalidFieldError("field"));
  });

  test("Should return falsy if compare is valid", () => {
    const valueToCompare = "any_value";
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
