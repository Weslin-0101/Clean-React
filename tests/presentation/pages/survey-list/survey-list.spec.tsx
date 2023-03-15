import React from 'react'
import '@testing-library/jest-dom'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { AccessDeniedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { SurveyList } from "@/presentation/pages"
import ApiContext from '@/presentation/contexts/api/api-context'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, waitFor } from "@testing-library/react"
import { mockAccountModel, mockSurveyListModel } from '@/tests/domain/mocks';


class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0;
    surveys = mockSurveyListModel();
    
    loadAll(): Promise<LoadSurveyList.Model[]> {
        this.callsCount++
        return Promise.resolve(this.surveys)
    }
}

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
    history: MemoryHistory
    setCurrentAccountMock (account: AccountModel): void
}
const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ["/"] })
    const setCurrentAccountMock = jest.fn()
    render(
        <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
            <Router location={""} navigator={history}>
                <SurveyList loadSurveyList={loadSurveyListSpy}/>
            </Router>
        </ApiContext.Provider>
    )
    return {
        loadSurveyListSpy,
        history,
        setCurrentAccountMock
    }
}

describe("SurveyList Component", () => {
    test("Should present 1 empty items on start", async () => {
        makeSut()
        const surveyList = screen.getByTestId("survey-list")
        expect(surveyList.querySelectorAll("li:empty")).toHaveLength(1);
        await waitFor(() => surveyList)
    })

    test("Should call LoadSurveyList", async () => {
        const { loadSurveyListSpy } = makeSut()
        expect(loadSurveyListSpy.callsCount).toBe(1)
        await waitFor(() => screen.getByRole("heading"))
    })

    test("Should render SurveyItems on success", async () => {
        makeSut()
        const surveyList = screen.getByTestId("survey-list");
        await waitFor(() => surveyList)
        expect(surveyList.querySelectorAll("li.surveyItemWrap")).toHaveLength(1)
    })

    test("Should logout on AccessDeniedError", async () => {
        const loadSurveyListSpy = new LoadSurveyListSpy();
        jest.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(new AccessDeniedError());
        const { setCurrentAccountMock, history } = makeSut(loadSurveyListSpy);
        await waitFor(() => screen.getByRole("heading"));
        expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
        expect(history.location.pathname).toBe("/login");
    })
})