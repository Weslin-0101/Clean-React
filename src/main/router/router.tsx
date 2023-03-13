import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MakeLogin, MakeSignUp } from '@/main/factories/pages'
import { SurveyList } from '@/presentation/pages'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<MakeLogin/>} />
                <Route path="/signup" element={<MakeSignUp />} />
                <Route path="/" element={<SurveyList />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router