import { Login } from '@/presentation/pages';
import { 
    makeRemoteAuthentication, 
    makeLoginValidation, 
    makeLocalUpdateCurrentAccount } 
from '@/main/factories/usecases';

import React from 'react';

const MakeLogin = () => {   
    return (
        <Login 
            validation={makeLoginValidation()} 
            authentication={makeRemoteAuthentication()} 
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    )
}

export default MakeLogin;