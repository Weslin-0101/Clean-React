import { Login } from '@/presentation/pages';
import { 
    makeRemoteAuthentication, 
    makeLoginValidation, 
    makeLocalSaveAccessToken } 
from '@/main/factories/usecases';

import React from 'react';

export const makeLogin: React.FC = () => {   
    return (
        <Login 
            validation={makeLoginValidation()} 
            authentication={makeRemoteAuthentication()} 
            saveAccessToken={makeLocalSaveAccessToken()}
        />
    )
}