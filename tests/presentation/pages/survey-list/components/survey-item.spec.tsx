import React from 'react'
import "@testing-library/jest-dom"
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { IconName } from '@/presentation/components'
import { mockSurveyModel } from '@/tests/domain/mocks'
import { render, screen } from "@testing-library/react"

describe("SurveyItem Component", () => {
    test("Should render with correct values", () => {
        const survey = mockSurveyModel();
        survey.didAnswer = true;
        survey.date = new Date("2023-03-14T00:00:00");
        render(<SurveyItem survey={survey}/>)
        expect(screen.getByTestId("icon")).toHaveProperty("src", IconName.thumbUp);
        expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
        expect(screen.getByTestId("day")).toHaveTextContent("14");
        expect(screen.getByTestId("month")).toHaveTextContent("mar");
        expect(screen.getByTestId("year")).toHaveTextContent("2023");
    })
})