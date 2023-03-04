import { FormStatus, Input, LoginHeader } from '@/presentation/components';
import React from 'react';
import Styles from './signup-styles.scss';
import Context from '@/presentation/contexts/form/form-context';
import Footer from '@/presentation/components/footer/footer';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={{ state: {} }}>
                <form className={Styles.form}>
                    <h2>Criar Conta</h2>
                    <Input type="text" name="name" placeholder="Digite seu nome" />
                    <Input type="email" name="email" placeholder="Digite seu e-mail" />
                    <Input type="password" name="password" placeholder="Digite seu senha" />
                    <Input type="password" name="ConfirmationPassword" placeholder="Confirme sua senha" />

                    <button disabled className={Styles.submit} type="submit">Criar Conta</button>
                    <Link to="/login" className={Styles.link}>Voltar Para Login</Link>

                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    )
}

export default Signup;