import React, { useContext, useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'
import { Header } from '@/presentation/components';
import Footer from '@/presentation/components/footer/footer';
import { SurveyContext, SurveyError, SurveyListsItem } from '@/presentation/pages/survey-list/components';
import { ApiContext } from '@/presentation/contexts';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { AccessDeniedError } from '@/domain/errors';
import { useNavigate } from 'react-router-dom';

type Props = {
    loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
    const history = useNavigate();
    const { setCurrentAccount } = useContext(ApiContext)
    const [state, setState] = useState({
        surveys: [] as LoadSurveyList.Model[],
        error: "",
        reload: false
    })

    useEffect(() => {
        loadSurveyList.loadAll()
            .then(surveys => setState({ ...state, surveys }))
            .catch(error => { 
                if (error instanceof AccessDeniedError) {
                    setCurrentAccount(undefined)
                    history("/login")
                } else {
                    setState({ ...state, error: error.message })

                }
            })
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