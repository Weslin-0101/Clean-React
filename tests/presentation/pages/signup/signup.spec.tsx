import React from "react";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { Signup } from "@/presentation/pages";
import { Helper, ValidationStub } from '@/tests/presentation/mock'

type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <Signup 
            validation={validationStub}
        />
    )
    return {
        sut
    }
}

describe("Signup Component", () => {
    afterEach(cleanup);

    test("Should start with inital state", () => {
        const validationError = "any_error"
        const { sut } = makeSut({ validationError });
        Helper.testChildCount(sut, "error-wrap", 0);

        Helper.testButtonIsDisabled(sut, "submit", true);

        Helper.testStatusForField(sut, "name", validationError);
        Helper.testStatusForField(sut, "email", "Campo obrigatório");
        Helper.testStatusForField(sut, "password", "Campo obrigatório");
        Helper.testStatusForField(sut, "passwordConfirmation", "Campo obrigatório");
    })

    test("Should show name error if Validation fails", () => {
        const validationError = "any_error";
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, "name");
        Helper.testStatusForField(sut, "name", validationError);
    })
})