import { Login } from '@/presentation/pages';
import { 
    makeRemoteAuthentication, 
    makeLoginValidation, 
    makeLocalSaveAccessToken } 
from '@/main/factories/usecases';

import React from 'react';

const MakeLogin = () => {   
    return (
        <Login 
            validation={makeLoginValidation()} 
            authentication={makeRemoteAuthentication()} 
            saveAccessToken={makeLocalSaveAccessToken()}
        />
    )
}

export default MakeLogin;