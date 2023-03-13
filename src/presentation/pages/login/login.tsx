import React, { useState, useEffect, useContext } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link } from 'react-router-dom'

type Props = {
    validation: Validation
    authentication: Authentication
}

const login: React.FC<Props> = ({ validation, authentication }: Props) => {
    const { setCurrentAccount } = useContext(ApiContext);
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: '',
    })

    useEffect(() => {
        const { email, password } = state
        const formData = { email, password };
        const emailError = validation.validate("email", formData)
        const passwordError = validation.validate("password", formData)
        
        setState({
            ...state,
            emailError,
            passwordError,
            isFormInvalid: !!emailError || !!passwordError
        })
    }, [state.email, state.password])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            if (state.isLoading || state.isFormInvalid) {
                return
            }
            setState({ ...state, isLoading: true })
            const account = await authentication.auth({
                email: state.email,
                password: state.password
            })
            setCurrentAccount(account);
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    return (
        <div className={Styles.login}>
           <LoginHeader />
           <FormContext.Provider value={{ state, setState }}>
            <form action="" data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Input type="email" name="email" placeholder='Digite seu e-mail'/>
                <Input type="password" name="password" placeholder='Digite sua senha'/>

                <SubmitButton text="Entrar" />
                <Link to="/signup" data-testid="signup" className={Styles.link}>Criar conta</Link>

                <FormStatus />
            </form>
           </FormContext.Provider>
            <Footer />
        </div>
    )
}

export default login