import React from "react";
import Styles from "./survey-lists-styles.scss";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { SurveyItemEmpty, SurveyItem } from "@/presentation/pages/survey-list/components";

type Props = {
    surveys: LoadSurveyList.Model[]
}

const SurveyLists: React.FC<Props> = ({ surveys }: Props) => {
    return (
        <ul data-testid="survey-list" className={Styles.listWrap}>
            { 
                surveys.length
                ? surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
                : <SurveyItemEmpty /> 
            }
        </ul>
    )
}

export default SurveyLists;