import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '@/presentation/pages'
import { makeLoginValidation, makeRemoteAuthentication } from '@/main/factories/usecases'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login validation={makeLoginValidation()} authentication={makeRemoteAuthentication()}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router