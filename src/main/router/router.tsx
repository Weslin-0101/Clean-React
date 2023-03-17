import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MakeLogin, MakeSignUp, MakeSurveyList } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { PrivateRoute } from '@/presentation/components'
import { SurveyResult } from '@/presentation/pages'

const Router: React.FC = () => {
    return (
        <ApiContext.Provider value={{ 
                setCurrentAccount: setCurrentAccountAdapter,
                getCurrentAccount: getCurrentAccountAdapter
            }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<MakeLogin/>} />
                    <Route path="/signup" element={<MakeSignUp />} />
                    <Route path="/survey-list" 
                        element={
                            <PrivateRoute>
                                <MakeSurveyList />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<SurveyResult />} />
                </Routes>
            </BrowserRouter>
        </ApiContext.Provider>
    )
}

export default Router