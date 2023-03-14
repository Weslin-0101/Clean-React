import React from 'react';
import Styles from './survey-item-empty-styles.scss';

const SurveyItemEmpyty: React.FC = () => {
    return (
        <>
            <li className={Styles.surveyItemEmpty}></li>
        </>
    )
}

export default SurveyItemEmpyty;