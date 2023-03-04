import React from "react";
import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import { Signup } from "@/presentation/pages";
import { AddAccountSpy, Helper, ValidationStub } from '@/tests/presentation/mock'

type SutTypes = {
    sut: RenderResult
    addAccountSpy: AddAccountSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const addAccountSpy = new AddAccountSpy()
    const sut = render(
        <Signup 
            validation={validationStub}
            addAccount={addAccountSpy}
        />
    )
    return {
        sut,
        addAccountSpy
    }
}

const simulateValidSubmit = async (sut: RenderResult, name = "any_name", email = "any_email@email.com", password = "any_password") => {
    Helper.populateField(sut, "name", name);
    Helper.populateField(sut, "email", email);
    Helper.populateField(sut, "password", password);
    Helper.populateField(sut, "passwordConfirmation", password);

    const form = sut.getByTestId("form");
    fireEvent.submit(form);
    await waitFor(() => form)
}

describe("Signup Component", () => {
    afterEach(cleanup);

    test("Should start with inital state", () => {
        const validationError = "any_error"
        const { sut } = makeSut({ validationError });
        Helper.testChildCount(sut, "error-wrap", 0);

        Helper.testButtonIsDisabled(sut, "submit", true);

        Helper.testStatusForField(sut, "name", validationError);
        Helper.testStatusForField(sut, "email", validationError);
        Helper.testStatusForField(sut, "password", validationError);
        Helper.testStatusForField(sut, "passwordConfirmation", validationError);
    })

    test("Should show name error if Validation fails", () => {
        const validationError = "any_error";
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, "name");
        Helper.testStatusForField(sut, "name", validationError);
    })
    
    test("Should show email error if Validation fails", () => {
        const validationError = "any_error";
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, "email");
        Helper.testStatusForField(sut, "email", validationError);
    })

    test("Should show password error if Validation fails", () => {
        const validationError = "any_error";
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, "password");
        Helper.testStatusForField(sut, "password", validationError);
    })

    test("Should show passwordConfirmation error if Validation fails", () => {
        const validationError = "any_error";
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, "passwordConfirmation");
        Helper.testStatusForField(sut, "passwordConfirmation", validationError);
    })

    test("Should show valid name state if Validation succeeds", () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "name");
        Helper.testStatusForField(sut, "name");
    })

    test("Should show valid email state if Validation succeeds", () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "email");
        Helper.testStatusForField(sut, "email");
    })

    test("Should show valid password state if Validation succeeds", () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "password");
        Helper.testStatusForField(sut, "password");
    })

    test("Should show valid passwordConfirmation state if Validation succeeds", () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "passwordConfirmation");
        Helper.testStatusForField(sut, "passwordConfirmation");
    })

    test("Should enable submit button if form is valid", () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "name");
        Helper.populateField(sut, "email");
        Helper.populateField(sut, "password");
        Helper.populateField(sut, "passwordConfirmation");
        Helper.testButtonIsDisabled(sut, "submit", false);
    })

    test("Should show spinner on submit", async () => {
        const { sut } = makeSut();
        await simulateValidSubmit(sut);
        Helper.testElementExists(sut, "spinner");
    })

    test("Should call AddAccountSpy with correct values", async () => {
        const { sut, addAccountSpy } = makeSut();
        const name = "any_name";
        const email = "any_email@email.com";
        const password = "any_password";
        await simulateValidSubmit(sut, name, email, password);
        expect(addAccountSpy.params).toEqual({
            name,
            email,
            password,
            passwordConfirmations: password
        })
    })

    test("Should call AddAccountSpy only once", async () => {
        const { sut, addAccountSpy } = makeSut();
        await simulateValidSubmit(sut);
        await simulateValidSubmit(sut);
        expect(addAccountSpy.callsCount).toBe(1);
    })

    test("Should not call AddAccountSpy if form is invalid", async () => {
        const validationError = "any_error"
        const { sut, addAccountSpy } = makeSut({ validationError });
        await simulateValidSubmit(sut);
        expect(addAccountSpy.callsCount).toBe(0);
    })
})