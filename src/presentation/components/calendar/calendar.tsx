import React from "react"
import Styles from "./calendar-styles.scss"

type Props = {
    date: Date
    className?: string
}

const Calendar: React.FC<Props> = ({ date, className }: Props) => {
    return (
        <time className={[Styles.calendarWrap, className].join(" ")}>
            <span data-testid="day" className={Styles.day}>{date.getDate()}</span>
            <span data-testid="month" className={Styles.month}>{date.toLocaleString("pt-Br", { month: "short" }).replace(".", " ")}</span>
            <span data-testid="year" className={Styles.year}>{date.getFullYear()}</span>
        </time>
    )
}

export default Calendar