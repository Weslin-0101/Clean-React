import { Login } from '@/presentation/pages';
import { 
    makeRemoteAuthentication, 
    makeLoginValidation
} from '@/main/factories/usecases';

import React from 'react';

const MakeLogin = () => {   
    return (
        <Login 
            validation={makeLoginValidation()} 
            authentication={makeRemoteAuthentication()} 
        />
    )
}

export default MakeLogin;