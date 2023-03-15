import React from 'react'
import '@testing-library/jest-dom'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { UnexpectedError } from '@/domain/errors';
import { SurveyList } from "@/presentation/pages"
import { render, screen, waitFor } from "@testing-library/react"
import { mockSurveyListModel } from '@/tests/domain/mocks';


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
}
const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
    render(<SurveyList loadSurveyList={loadSurveyListSpy}/>)
    return {
        loadSurveyListSpy
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
})