import { InvalidFieldError } from "@/validation/errors";
import { MinLenghtValidation } from "@/validation/validators";

describe("MinLengthValidation", () => {
  test("Should return an error if value is invalid", () => {
    const sut = new MinLenghtValidation("field", 8);
    const error = sut.validate("123");
    expect(error).toEqual(new InvalidFieldError("field"));
  });
});
