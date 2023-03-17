import React, { useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'
import { Header, Error } from '@/presentation/components';
import Footer from '@/presentation/components/footer/footer';
import { useErrorHandler } from '@/presentation/hooks';
import { SurveyContext, SurveyListsItem } from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    const handlerError = useErrorHandler((error: Error) => {
        setState(old => ({ ...old, error: error.message }))
    })
    
    const [state, setState] = useState({
        surveys: [] as LoadSurveyList.Model[],
        error: "",
        reload: false
    })

    const reload = (): void => {
        setState(old => ({
            surveys: [] as LoadSurveyList.Model[],
            error: "",
            reload: !old.reload
        }))
    }

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState(old => ({ ...old, surveys })))
            .catch(handlerError)
    }, [state.reload])
    
    return (
        <div className={Styles.surveyListWrap}>
            <Header />

            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <SurveyContext.Provider value={{ state, setState }}>
                    { 
                        state.error ? <Error error={state.error} reload={reload} /> : <SurveyListsItem /> 
                    }
                </SurveyContext.Provider>
            </div>

            <Footer />
        </div>
    )
}

export default SurveyList;