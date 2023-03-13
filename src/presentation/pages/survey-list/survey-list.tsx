import React from 'react'
import Styles from './survey-list-styles.scss'
import { Header, Icon, IconName } from '@/presentation/components';
import Footer from '@/presentation/components/footer/footer';

const SurveyList: React.FC = () => {
    return (
        <div className={Styles.surveyListWrap}>
            <Header />

            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul>
                    <li>
                        <div className={Styles.surveyContent}>
                            <Icon className={Styles.iconWrap} iconName={IconName.thumbDown}/>
                            <time>
                                <span className={Styles.day}>12</span>
                                <span className={Styles.month}>03</span>
                                <span className={Styles.year}>2023</span>
                            </time>
                            <p>Quer ver algo que vai te deixar de boca aberta?</p>
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