import React from "react"
import Styles from "./answer-styles.scss"

type Props = {
    answer: {
        image?: string;
        answer: string;
        count: number;
        percent: number;
        isCurrentAccountAnswer: boolean;
    }
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
    const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ""
    return (
        <li className={[Styles.answerWrap, activeClassName].join(" ")}>
            { answer.image && <img src={answer.image} alt={answer.answer} />}
            <span className={Styles.answer}>{answer.answer}</span>
            <span className={Styles.percent}>{answer.percent}</span>
        </li>
    )
}

export default Answer