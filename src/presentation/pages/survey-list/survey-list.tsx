import React, { useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'
import { Header } from '@/presentation/components';
import Footer from '@/presentation/components/footer/footer';
import { useErrorHandler } from '@/presentation/hooks';
import { SurveyContext, SurveyError, SurveyListsItem } from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    const handlerError = useErrorHandler((error: Error) => {
        setState({ ...state, error: error.message })
    })
    
    const [state, setState] = useState({
        surveys: [] as LoadSurveyList.Model[],
        error: "",
        reload: false
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState({ ...state, surveys }))
            .catch(handlerError)
    }, [state.reload])
    
    return (
        <div className={Styles.surveyListWrap}>
            <Header />

            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state, setState }}>
                    { 
                        state.error ? <SurveyError /> : <SurveyListsItem /> 
                    }
                </SurveyContext.Provider>
            </div>

            <Footer />
        </div>
    )
}

export default SurveyList;