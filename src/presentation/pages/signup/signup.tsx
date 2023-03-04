import { FormStatus, Input, LoginHeader } from '@/presentation/components';
import React, { useState } from 'react';
import Styles from './signup-styles.scss';
import Context from '@/presentation/contexts/form/form-context';
import Footer from '@/presentation/components/footer/footer';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
    const [state] = useState({
        isLoading: false,
        nameError: "Campo obrigatório",
        emailError: "Campo obrigatório",
        passwordError: "Campo obrigatório",
        passwordConfirmationError: "Campo obrigatório",
        mainError: ""
    })

    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={ {state} }>
                <form className={Styles.form}>
                    <h2>Criar Conta</h2>
                    <Input type="text" name="name" placeholder="Digite seu nome" />
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite seu senha" />
                    <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />

                    <button data-testid="submit" disabled className={Styles.submit} type="submit">Criar Conta</button>
                    <span className={Styles.link}>Voltar Para Login</span>

                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Signup;