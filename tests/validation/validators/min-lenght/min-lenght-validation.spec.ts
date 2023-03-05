import { InvalidFieldError } from "@/validation/errors";
import { MinLenghtValidation } from "@/validation/validators";

import faker from "faker";

const makeSut = (field: string): MinLenghtValidation => {
  return new MinLenghtValidation(field, 8);
};

describe("MinLengthValidation", () => {
  test("Should return an error if value is invalid", () => {
    const field = "field";
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(7) });
    expect(error).toEqual(new InvalidFieldError("field"));
  });

  test("Should return falsy if value is valid", () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(8) });
    expect(error).toBeFalsy();
  });

  test("Should return falsy if field does not exists in schema", () => {
    const sut = makeSut(faker.database.column());
    const error = sut.validate({
      [faker.database.column()]: faker.random.alphaNumeric(8),
    });
    expect(error).toBeFalsy();
  });
});
