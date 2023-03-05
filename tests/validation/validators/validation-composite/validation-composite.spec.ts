import { ValidationComposite } from "@/validation/validators";
import { FieldValidationSpy } from "@/tests/validation/mocks";

import faker from "faker";

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy("any_field"),
    new FieldValidationSpy("any_field"),
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe("ValidationComposite", () => {
  test("Should return error if any validation fails", () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut();
    const errorMessage = faker.random.words();
    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, {
      [fieldName]: faker.random.words(),
    });
    expect(error).toBe(error);
  });

  test("Should return falsy if any validation not fails", () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut();
    const error = sut.validate(fieldName, {
      [fieldName]: faker.random.words(),
    });
    expect(error).toBeFalsy();
  });
});
