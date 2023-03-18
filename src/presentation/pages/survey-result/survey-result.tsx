import React, { useEffect, useState } from "react"
import Styles from './survey-result-styles.scss'
import FlipMove from "react-flip-move"
import { Calendar, Error, Footer, Header, Loading } from "@/presentation/components"
import { LoadSurveyResult } from "@/domain/usecases"

type Props = {
    loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
    const [state] = useState({
        isLoading: false,
        error: "",
        surveyResult: null as LoadSurveyResult.Model
    })

    useEffect(() => {
        loadSurveyResult.load()
            .then()
            .catch()
    }, [])

    return (
        <div className={Styles.surveyResultWrap}>
            <Header />

            <div data-test-id="survey-result" className={Styles.contentWrap}>
                { state.surveyResult &&
                <> 
                    <hgroup>
                        <Calendar date={new Date()} className={Styles.calendarWrap}/>
                        <h2>Qual é o seu Framework preferido?</h2>
                    </hgroup>
                    <FlipMove className={Styles.answersList}>
                        <li>
                            <img src="https://www.datocms-assets.com/45470/1631110818-logo-react-js.png" />
                            <span className={Styles.answer}>ReactJS</span>
                            <span className={Styles.percent}>50%</span>
                        </li>
                        <li className={Styles.active}>
                            <img src="https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-1.png" />
                            <span className={Styles.answer}>JavaScript</span>
                            <span className={Styles.percent}>80%</span>
                        </li>
                    </FlipMove>
                    <button>Voltar</button>
                    { state.isLoading && <Loading />}
                    { state.error && <Error error={state.error} reload={() => {}} />}
                </>
                }
            </div>

            <Footer />
        </div>
    )
}

export default SurveyResult