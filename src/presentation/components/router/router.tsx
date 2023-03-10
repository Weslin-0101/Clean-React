import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, Signup } from '@/presentation/pages'
import { makeLocalSaveAccessToken, makeLoginValidation, makeRemoteAddAccount, makeRemoteAuthentication, makeSignUpValidation } from '@/main/factories/usecases'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login validation={makeLoginValidation()} authentication={makeRemoteAuthentication()} saveAccessToken={makeLocalSaveAccessToken()}/>}/>
                <Route path="/signup" element={<Signup validation={makeSignUpValidation()} addAccount={makeRemoteAddAccount()} saveAccessToken={makeLocalSaveAccessToken()}/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router