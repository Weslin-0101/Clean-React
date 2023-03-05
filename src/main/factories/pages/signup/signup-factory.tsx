import { Signup } from '@/presentation/pages';
import React from 'react';
import { 
    makeLocalSaveAccessToken, 
    makeRemoteAddAccount, 
    makeSignUpValidation 
} from '@/main/factories/usecases';

export const makeSignUp: React.FC = () => {
    return (
        <Signup 
            validation={makeSignUpValidation()}
            addAccount={makeRemoteAddAccount()}
            saveAccessToken={makeLocalSaveAccessToken()}
        />
    )
}