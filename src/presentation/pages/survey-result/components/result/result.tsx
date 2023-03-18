import React from "react"
import Styles from "./result-styles.scss"
import FlipMove from "react-flip-move"
import { Link } from "react-router-dom"
import { Calendar } from "@/presentation/components"
import { LoadSurveyResult } from "@/domain/usecases"

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
                { surveyResult.answers.map(answer => 
                    <li key={answer.answer}>
                        { answer.image && <img src={answer.image} alt={answer.answer} />}
                        <span className={Styles.answer}>{answer.answer}</span>
                        <span className={Styles.percent}>{answer.percent}</span>
                    </li>
                )}
            </FlipMove>
            <button className={Styles.button}><Link to={"/survey-list"}>Voltar</Link></button>
        </>
    )
}

export default Result