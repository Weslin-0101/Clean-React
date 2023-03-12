import React from 'react'
import Styles from './survey-list-styles.scss'
import { Logo } from '@/presentation/components';
import Footer from '@/presentation/components/footer/footer';

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyListWrap}>
            <header className={Styles.headerWrap}>
                <div className={Styles.headerContent}>
                    <Logo />
                    <div className={Styles.logoutWrap}>
                        <span>Wesley</span>
                        <a href="#">Sair</a>
                    </div>
                </div>
            </header>

            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul>
                    <li>
                        <div className={Styles.surveyContent}>
                            <time>
                                <span className={Styles.day}>12</span>
                                <span className={Styles.month}>03</span>
                                <span className={Styles.year}>2023</span>
                            </time>
                            <p>Quer ver algo que vai te deixar de boa aberta?</p>
                        </div>
                        <footer>Ver Resultado</footer>
                    </li>
                </ul>
            </div>

            <Footer />
        </div>
    )
}

export default SurveyList;