import React from "react"
import Styles from "./result-styles.scss"
import FlipMove from "react-flip-move"
import { Link } from "react-router-dom"
import { LoadSurveyResult } from "@/domain/usecases"
import { Calendar } from "@/presentation/components"
import { SurveyResultAnswer } from "@/presentation/pages/survey-result/components"

type Props = {
    surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
    return (
        <> 
            <hgroup>
                <Calendar date={surveyResult.date} className={Styles.calendarWrap}/>
                <h2>{surveyResult.question}</h2>
            </hgroup>
            <FlipMove className={Styles.answersList}>
                <>
                { surveyResult.answers.map(answer => 
                    <SurveyResultAnswer key={answer.answer} answer={answer} />
                )}
                </>
            </FlipMove>
            <button className={Styles.button}><Link to={"/survey-list"}>Voltar</Link></button>
        </>
    )
}

export default Result