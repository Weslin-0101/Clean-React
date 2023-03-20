import React, { useContext } from "react"
import Styles from "./answer-styles.scss"
import { AnswerModel } from "@/domain/models"
import { SurveyResultContext } from "@/presentation/pages/survey-result/components"

type Props = {
    answer: AnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
    const { onAnswer } = useContext(SurveyResultContext)
    const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ""
    const answerClick = (event: React.MouseEvent): void => {
        if (event.currentTarget.classList.contains(Styles.active)) {
            return
        }
        onAnswer(answer.answer)
    }
    return (
        <li 
            className={[Styles.answerWrap, activeClassName].join(" ")}
            onClick={answerClick}
        >
            { answer.image && <img src={answer.image} alt={answer.answer} />}
            <span className={Styles.answer}>{answer.answer}</span>
            <span className={Styles.percent}>{answer.percent}</span>
        </li>
    )
}

export default Answer