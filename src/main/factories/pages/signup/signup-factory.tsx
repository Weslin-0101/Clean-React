import { Signup } from '@/presentation/pages';
import React from 'react';
import { 
    makeLocalUpdateCurrentAccount, 
    makeRemoteAddAccount, 
    makeSignUpValidation 
} from '@/main/factories/usecases';

const MakeSignUp = () => {
    return (
        <Signup 
            validation={makeSignUpValidation()}
            addAccount={makeRemoteAddAccount()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    )
}

export default MakeSignUp;