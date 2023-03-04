import React from "react";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { Signup } from "@/presentation/pages";
import { Helper } from '@/tests/presentation/mock'

type SutTypes = {
    sut: RenderResult
}

const makeSut = (): SutTypes => {
    const sut = render(
        <Signup />
    )
    return {
        sut
    }
}

describe("Signup Component", () => {
    afterEach(cleanup);

    test("Should start with inital state", () => {
        const validationError = "Campo obrigatório"
        const { sut } = makeSut();
        Helper.testChildCount(sut, "error-wrap", 0);

        Helper.testButtonIsDisabled(sut, "submit", true);

        Helper.testStatusForField(sut, "name", validationError);
        Helper.testStatusForField(sut, "email", validationError);
        Helper.testStatusForField(sut, "password", validationError);
        Helper.testStatusForField(sut, "passwordConfirmation", validationError);
    })
})