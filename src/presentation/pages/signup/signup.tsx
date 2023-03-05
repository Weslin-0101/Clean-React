import { FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components';
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

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
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
        const { name, email, password, passwordConfirmation } = state
        const formData = { name, email, password, passwordConfirmation };
        const nameError = validation.validate("name", formData)
        const emailError = validation.validate("email", formData)
        const passwordError = validation.validate("password", formData)
        const passwordConfirmationError = validation.validate("passwordConfirmation", formData)

        setState({
            ...state,
            nameError,
            emailError,
            passwordError,
            passwordConfirmationError,
            isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
        })
    }, [state.name, state.email, state.password, state.passwordConfirmation])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            if (state.isLoading || state.isFormInvalid) {
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

                    <SubmitButton text="Cadastar" />
                    <Link data-testid="login-link" to="/login" className={Styles.link}>Voltar Para Login</Link>

                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Signup;