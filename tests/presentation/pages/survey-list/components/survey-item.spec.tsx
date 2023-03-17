import React from 'react'
import "@testing-library/jest-dom"
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { IconName } from '@/presentation/components'
import { mockSurveyModel } from '@/tests/domain/mocks'
import { render, screen } from "@testing-library/react"

const makeSut = (survey = mockSurveyModel()): void => {
    render(<SurveyItem survey={survey}/>)
}

describe("SurveyItem Component", () => {
    test("Should render with correct values", () => {
        const survey = Object.assign(mockSurveyModel(), {
            didAnswer: true,
            date: new Date("2023-03-14T00:00:00")
        });
        makeSut(survey);
        expect(screen.getByTestId("icon")).toHaveProperty("src", IconName.thumbUp);
        expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    })
})