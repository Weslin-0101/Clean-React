import { FormStatus, Input, LoginHeader } from '@/presentation/components';
import React, { useEffect, useState } from 'react';
import Styles from './signup-styles.scss';
import Context from '@/presentation/contexts/form/form-context';
import Footer from '@/presentation/components/footer/footer';
import { Link } from 'react-router-dom';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount, SaveAccessToken } from '@/domain/usecases';

type Props = {
    validation: Validation
    addAccount: AddAccount
    saveAccessToken: SaveAccessToken
}

const handleButtonError = (state: any) => {
    return !!state.nameError ||
        !!state.emailError ||
        !!state.passwordError ||
        !!state.passwordConfirmationError
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        nameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        passwordConfirmation: "",
        passwordConfirmationError: "",
        mainError: ""
    })

    useEffect(() => {
        setState({
            ...state,
            nameError: validation.validate("name", state.name),
            emailError: validation.validate("email", state.email),
            passwordError: validation.validate("password", state.password),
            passwordConfirmationError: validation.validate("passwordConfirmation", state.passwordConfirmation)
        })
    }, [state.name, state.email, state.password, state.passwordConfirmation])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            if (state.isLoading || handleButtonError(state)) {
                return
            }
            setState({ ...state, isLoading: true })
            const account = await addAccount.add({
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirmations: state.passwordConfirmation,
            })
            await saveAccessToken.save(account.accessToken)
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }
    
    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={ { state, setState } }>
                <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
                    <h2>Criar Conta</h2>
                    <Input type="text" name="name" placeholder="Digite seu nome" />
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite seu senha" />
                    <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />

                    <button data-testid="submit" disabled={handleButtonError(state)} className={Styles.submit} type="submit">Criar Conta</button>
                    <span className={Styles.link}>Voltar Para Login</span>

                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Signup;