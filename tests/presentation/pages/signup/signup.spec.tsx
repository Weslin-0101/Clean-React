import React from "react";
import { cleanup, render, RenderResult } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Signup } from "@/presentation/pages";

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

const testChildCount = (sut: RenderResult, field: string, count: number): void => {
    const el = sut.getByTestId(field);
    expect(el.childElementCount).toBe(count);
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement;
    expect(button.disabled).toBe(isDisabled);
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`);
    expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
    expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
}

describe("Signup Component", () => {
    afterEach(cleanup);

    test("Should start with inital state", () => {
        const validationError = "Campo obrigatório"
        const { sut } = makeSut();
        testChildCount(sut, "error-wrap", 0);

        testButtonIsDisabled(sut, "submit", true);

        testStatusForField(sut, "name", validationError);
        testStatusForField(sut, "email", validationError);
        testStatusForField(sut, "password", validationError);
        testStatusForField(sut, "passwordConfirmation", validationError);
    })
})