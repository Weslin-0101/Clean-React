import React from "react"
import Styles from './survey-result-styles.scss'
import FlipMove from "react-flip-move"
import { Footer, Header, Loading } from "@/presentation/components"

const SurveyResult: React.FC = () => {
    return (
        <div className={Styles.surveyResultWrap}>
            <Header />

            <div className={Styles.contentWrap}>
                <h2>Qual é o seu Framework preferido?</h2>
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
                { false && <Loading />}
            </div>

            <Footer />
        </div>
    )
}

export default SurveyResult