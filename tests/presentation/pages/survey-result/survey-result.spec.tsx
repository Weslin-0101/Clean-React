import React from "react";
import "@testing-library/jest-dom"
import { ApiContext } from "@/presentation/contexts";
import { SurveyResult } from "@/presentation/pages";
import { render, screen } from "@testing-library/react"
import { mockAccountModel } from "@/tests/domain/mocks";
import { Router } from "react-router-dom";

describe("SurveyResult Page", () => {
    test("Should present correct initial state", () => {
        // render(
        //     <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        //         <Router location={""} navigator={undefined}>
        //             <SurveyResult />
        //         </Router>
        //     </ApiContext.Provider>
        // )
        // const surveyResultComponent = screen.getByTestId("survey-result")
        // expect(surveyResultComponent.childElementCount).toBe(0);
        // expect(screen.queryByTestId("error")).not.toBeInTheDocument();
        // expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    })
})