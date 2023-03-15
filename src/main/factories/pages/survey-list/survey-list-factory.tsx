import React from "react";
import { SurveyList } from "@/presentation/pages"
import { makeRemoteLoadSurveyList } from "@/main/factories/usecases"

const MakeSurveyList = () => {
    return (
        <SurveyList loadSurveyList={makeRemoteLoadSurveyList()}/>
    )
}

export default MakeSurveyList;