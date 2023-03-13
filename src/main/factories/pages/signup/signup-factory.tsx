import { Signup } from '@/presentation/pages';
import React from 'react';
import { 
    makeRemoteAddAccount, 
    makeSignUpValidation 
} from '@/main/factories/usecases';

const MakeSignUp = () => {
    return (
        <Signup 
            validation={makeSignUpValidation()}
            addAccount={makeRemoteAddAccount()}
        />
    )
}

export default MakeSignUp;