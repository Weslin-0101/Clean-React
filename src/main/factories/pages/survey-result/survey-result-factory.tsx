import React from "react"
import { SurveyResult } from "@/presentation/pages"
import { makeRemoteLoadSurveyResult } from "@/main/factories/usecases"
import { useParams } from "react-router-dom"

const MakeSurveyResult = () => {
    const { id } = useParams();
    return (
        <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)}/>
    )
}

export default MakeSurveyResult