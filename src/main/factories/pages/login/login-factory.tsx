import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { Login } from '@/presentation/pages';
import { ValidationBuilder, ValidationComposite } from '@/validation/validators';
import React from 'react';

export const makeLogin: React.FC = () => {
    const url = 'http://fordevs.herokuapp.com/api/login';
    const axiosHttpClient = new AxiosHttpClient();
    const removeAuthentication = new RemoteAuthentication(url, axiosHttpClient)

    const validationComposite = new ValidationComposite([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
    ])
    
    return (
        <Login validation={validationComposite} authentication={removeAuthentication}/>
    )
}