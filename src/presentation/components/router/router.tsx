import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

const Router: React.FC = () => {
    const url = 'http://fordevs.herokuapp.com/api/login';
    const axiosHttpClient = new AxiosHttpClient();
    const removeAuthentication = new RemoteAuthentication(url, axiosHttpClient)

    const validationComposite = new ValidationComposite([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
    ])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login validation={validationComposite} authentication={removeAuthentication}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router