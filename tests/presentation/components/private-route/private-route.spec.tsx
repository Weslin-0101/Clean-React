import React from "react"
import { Router } from "react-router-dom"
import { createMemoryHistory, MemoryHistory } from "history";
import { PrivateRoute } from "@/presentation/components"
import { ApiContext } from '@/presentation/contexts'
import { render } from '@testing-library/react'
import { mockAccountModel } from "@/tests/domain/mocks";

type SutTypes = {
    history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ["/"] })
        render(
            <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
                <Router location={"/login"} navigator={history}>
                    <PrivateRoute />
                </Router>
            </ApiContext.Provider>
        )
    return {
        history
    }
}

describe("PrivateRoute Component", () => {
    test("Should redirect to /login if token is empty", () => {
        const { history } = makeSut(null);
        expect(history.location.pathname).toBe("/login");
    })

    test("Should render current component if token is not empty", () => {
        // const { history } = makeSut()
        // expect(history.location.pathname).toBe("/");
    })
})