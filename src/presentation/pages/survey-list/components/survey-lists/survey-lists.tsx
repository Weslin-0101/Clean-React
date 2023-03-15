import React, { useContext } from "react";
import Styles from "./survey-lists-styles.scss";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { SurveyItemEmpty, SurveyItem, SurveyContext } from "@/presentation/pages/survey-list/components";

const SurveyLists: React.FC = () => {
    const { state } = useContext(SurveyContext)
    return (
        <ul data-testid="survey-list" className={Styles.listWrap}>
            { 
                state.surveys.length
                ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
                : <SurveyItemEmpty /> 
            }
        </ul>
    )
}

export default SurveyLists;