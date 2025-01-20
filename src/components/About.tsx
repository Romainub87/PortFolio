import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhp, faSymfony, faAngular, faSquareJs } from '@fortawesome/free-brands-svg-icons';
import {useScopedI18n} from "@/locales/client";

const About: React.FC = () => {
    const t = useScopedI18n('about');


    return (
        <section id="about" className="text-center sm:text-left max-w-4xl dark:text-gray-400">
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">{t('title')}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-justify">
                {t('content', {
                    phpIcon: <FontAwesomeIcon icon={faPhp} className="fa-xl text-indigo-600" />,
                    jsIcon: <FontAwesomeIcon icon={faSquareJs} className="fa-lg text-yellow-500" />,
                    symfonyIcon: <FontAwesomeIcon icon={faSymfony} className="fa-lg text-blue-800" />,
                    angularIcon: <FontAwesomeIcon icon={faAngular} className="fa-lg text-red-600" />,
                    sullyGroupLink: <a href="https://www.sully-group.com/en/" className="bg-gradient-to-r from-pink-400 to-purple-400 dark:from-pink-500 dark:to-purple-500 bg-clip-text text-transparent"> Sully Group </a>
                })}
            </p>
        </section>
    );
};

export default About;