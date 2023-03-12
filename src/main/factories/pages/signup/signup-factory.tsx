import { Signup } from '@/presentation/pages';
import React from 'react';
import { 
    makeLocalSaveAccessToken, 
    makeRemoteAddAccount, 
    makeSignUpValidation 
} from '@/main/factories/usecases';

const MakeSignUp = () => {
    return (
        <Signup 
            validation={makeSignUpValidation()}
            addAccount={makeRemoteAddAccount()}
            saveAccessToken={makeLocalSaveAccessToken()}
        />
    )
}

export default MakeSignUp;