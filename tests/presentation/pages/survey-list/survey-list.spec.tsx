import React from 'react'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { render, screen } from "@testing-library/react"
import { SurveyList } from "@/presentation/pages"


class LoadSurveyListSpy implements LoadSurveyList {
    callsCount = 0;
    
    loadAll(): Promise<LoadSurveyList.Model[]> {
        this.callsCount++
        return Promise.resolve([])
    }
}

type SutTypes = {
    loadSurveyListSpy: LoadSurveyListSpy
}
const makeSut = (): SutTypes => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    render(<SurveyList loadSurveyList={loadSurveyListSpy}/>)
    return {
        loadSurveyListSpy
    }
}

describe("SurveyList Component", () => {
    test("Should present 1 empty items on start", () => {
        makeSut()
        const surveyList = screen.getByTestId("survey-list")
        expect(surveyList.querySelectorAll("li:empty").length).toBe(1);
    })

    test("Should call LoadSurveyList", () => {
        const { loadSurveyListSpy } = makeSut()
        expect(loadSurveyListSpy.callsCount).toBe(1)
    })
})