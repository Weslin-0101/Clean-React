import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MakeLogin, MakeSignUp } from '@/main/factories/pages'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '@/main/adapters'

const Router: React.FC = () => {
    return (
        <ApiContext.Provider value={{ 
                setCurrentAccount: setCurrentAccountAdapter 
            }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<MakeLogin/>} />
                    <Route path="/signup" element={<MakeSignUp />} />
                    <Route path="/" element={<SurveyList />}/>
                </Routes>
            </BrowserRouter>
        </ApiContext.Provider>
    )
}

export default Router