import React from 'react'
import "@testing-library/jest-dom"
import { Calendar } from '@/presentation/components'
import { render, screen } from "@testing-library/react"

const makeSut = (date: Date): void => {
    render(<Calendar date={date} />)
}

describe("Calendar Component", () => {
    test("Should render with correct values", () => {
        makeSut(new Date("2023-03-14T00:00:00"));
        expect(screen.getByTestId("day")).toHaveTextContent("14");
        expect(screen.getByTestId("month")).toHaveTextContent("mar");
        expect(screen.getByTestId("year")).toHaveTextContent("2023");
    })
})