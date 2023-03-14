import React from 'react';
import Styles from './survey-item-styles.scss'
import { Icon, IconName } from '@/presentation/components';

const SurveyItem: React.FC = () => {
    return (
        <li className={Styles.surveyItemWrap}>
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
    )
}

export default SurveyItem;