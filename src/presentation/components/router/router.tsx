import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login, Signup } from '@/presentation/pages'
import { makeLocalSaveAccessToken, makeLoginValidation, makeRemoteAuthentication } from '@/main/factories/usecases'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login validation={makeLoginValidation()} authentication={makeRemoteAuthentication()} saveAccessToken={makeLocalSaveAccessToken()}/>}/>
                <Route path="/signup" element={<Signup validation={undefined} addAccount={undefined} saveAccessToken={undefined}/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router