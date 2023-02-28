import React from "react";
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationStub } from "@/tests/presentation/mock";
import faker from 'faker';

type SutTypes = {
    sut: RenderResult
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    validationStub.errorMessage = params?.validationError;
    const sut = render(<Login validation={validationStub}/>)
    return {
        sut
    }

}

describe("Login Component", () => {
    afterEach(cleanup);

    test("Should start with initial state", () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError });
        const errorWrap = sut.getByTestId("error-wrap");
        expect(errorWrap.childElementCount).toBe(0);

        const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);

        const emailStatus = sut.getByTestId("email-status") as HTMLInputElement;
        expect(emailStatus.title).toBe(validationError);
        expect(emailStatus.textContent).toBe("🔴");
        const passwordStatus = sut.getByTestId("password-status") as HTMLInputElement;
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe("🔴");
    })

    test('Should show email error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError });
        const emailInput = sut.getByTestId("email");
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const emailStatus = sut.getByTestId("email-status");
        expect(emailStatus.title).toBe(validationError);
        expect(emailStatus.textContent).toBe("🔴");   
    })

    test('Should show password error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError });
        const passwordInput = sut.getByTestId("password");
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const passwordStatus = sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe("🔴");   
    })

    test('Should show valid state if email is valid', () => {
        const { sut } = makeSut();
        const emailInput = sut.getByTestId("email");
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const emailStatus = sut.getByTestId("email-status");
        expect(emailStatus.title).toBe('Tudo certo!');
        expect(emailStatus.textContent).toBe("🟢");   
    })

    test('Should show valid state if password is valid', () => {
        const { sut } = makeSut();
        const passwordInput = sut.getByTestId("password");
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const passwordStatus = sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe('Tudo certo!');
        expect(passwordStatus.textContent).toBe("🟢");   
    })

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut();
        const emailInput = sut.getByTestId("email");
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const passwordInput = sut.getByTestId("password");
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
    })
    
})