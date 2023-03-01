import { InvalidFieldError } from "@/validation/errors";
import { MinLenghtValidation } from "@/validation/validators";

import faker from "faker";

const makeSut = (): MinLenghtValidation => {
  return new MinLenghtValidation("field", 8);
};

describe("MinLengthValidation", () => {
  test("Should return an error if value is invalid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(7));
    expect(error).toEqual(new InvalidFieldError("field"));
  });

  test("Should return falsy if value is valid", () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(8));
    expect(error).toBeFalsy();
  });
});
