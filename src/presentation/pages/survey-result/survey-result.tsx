import React, { useEffect, useState } from "react"
import Styles from './survey-result-styles.scss'
import FlipMove from "react-flip-move"
import { Calendar, Error, Footer, Header, Loading } from "@/presentation/components"
import { useErrorHandler } from "@/presentation/hooks"
import { LoadSurveyResult } from "@/domain/usecases"
import { Link } from "react-router-dom"

type Props = {
    loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        error: "",
        surveyResult: null as LoadSurveyResult.Model,
        reload: false
    })

    const handleError = useErrorHandler((error: Error) => {
        setState(old => ({ ...old, surveyResult: null, error: error.message }))
    })

    const reload = (): void => setState(old => ({ ...old, surveyResult: null, error: "", reload: !old.reload }))

    useEffect(() => {
        loadSurveyResult.load()
            .then(surveyResult => setState(old => ({ ...old, surveyResult })))
            .catch(handleError)
    }, [state.reload])

    return (
        <div className={Styles.surveyResultWrap}>
            <Header />

            <div data-testid="survey-result" className={Styles.contentWrap}>
                { state.surveyResult &&
                <> 
                    <hgroup>
                        <Calendar date={state.surveyResult.date} className={Styles.calendarWrap}/>
                        <h2>{state.surveyResult.question}</h2>
                    </hgroup>
                    <FlipMove className={Styles.answersList}>
                        { state.surveyResult.answers.map(answer => 
                            <li key={answer.answer}>
                                { answer.image && <img src={answer.image} alt={answer.answer} />}
                                <span className={Styles.answer}>{answer.answer}</span>
                                <span className={Styles.percent}>{answer.percent}</span>
                            </li>
                        )}
                    </FlipMove>
                    <button><Link to={"/survey-list"}>Voltar</Link></button>
                    { state.isLoading && <Loading />}
                    { state.error && <Error error={state.error} reload={reload} />}
                </>
                }
            </div>

            <Footer />
        </div>
    )
}

export default SurveyResult