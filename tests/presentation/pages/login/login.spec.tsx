import React from "react";
import faker from 'faker';

import { Login } from '@/presentation/pages'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { 
    ValidationStub, 
    AuthenticationSpy, 
    SaveAccessTokenMock, 
    Helper 
} from "@/tests/presentation/mock";
import { InvalidCredentialsError } from "@/domain/errors";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "@remix-run/router";

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
    saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy();
    const saveAccessTokenMock = new SaveAccessTokenMock();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <Router location={"/login"} navigator={history}>
            <Login 
                validation={validationStub} 
                authentication={authenticationSpy} 
                saveAccessToken={saveAccessTokenMock}
            />
        </Router>
    );
    return {
        sut,
        authenticationSpy,
        saveAccessTokenMock
    }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
    Helper.populateField(sut, "email", email);
    Helper.populateField(sut, "password", password);
    const form = sut.getByTestId("form")
    fireEvent.submit(form);
    await waitFor(() => form);
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const el = sut.getByTestId(fieldName);
    expect(el).toBeTruthy();
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const el = sut.getByTestId(fieldName);
    expect(el.textContent).toBe(text);
}

describe("Login Component", () => {
    afterEach(cleanup);

    test("Should start with initial state", () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError });
        Helper.testChildCount(sut, "error-wrap", 0);

        Helper.testButtonIsDisabled(sut, "submit", true);

        Helper.testStatusForField(sut, "email", validationError);
        Helper.testStatusForField(sut, "password", validationError);
    })

    test('Should show email error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, "email");
        Helper.testStatusForField(sut, "email", validationError);
    })

    test('Should show password error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError });
        Helper.populateField(sut, "password");
        Helper.testStatusForField(sut, "password", validationError);  
    })

    test('Should show valid state if email is valid', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "email");
        Helper.testStatusForField(sut, "email");
    })

    test('Should show valid state if password is valid', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "password");
        Helper.testStatusForField(sut, "password"); 
    })

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "email");
        Helper.populateField(sut, "password");
        Helper.testButtonIsDisabled(sut, "submit", false);
    })

    test('Should show spinner on submit', async () => {
        const { sut } = makeSut();
        await simulateValidSubmit(sut)
        testElementExists(sut, "spinner");
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut();
        const email = faker.internet.email();
        const password = faker.internet.password();
        await simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password
        });
    })

    test('Should call Authentication only once', async () => {
        const { sut, authenticationSpy } = makeSut();
        await simulateValidSubmit(sut)
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1);
    })

    test('Should not call Authentication if form is invalid', async () => {
        const validationError = faker.random.words();
        const { sut, authenticationSpy } = makeSut({ validationError });
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(0);
    })

    test('Should present error if Authentication fails', async () => {
        const { sut, authenticationSpy } = makeSut();
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
        await simulateValidSubmit(sut);
        testElementText(sut, "main-error", error.message);
        Helper.testChildCount(sut, "error-wrap", 1);
    })

    test('Should call SaveAccessToken on success', async () => {
        const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
        await simulateValidSubmit(sut);
        expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);
    })
})