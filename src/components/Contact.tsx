import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy} from "@fortawesome/free-solid-svg-icons";
import { faXTwitter, faLinkedin, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import maltImage from '@/assets/malt.svg';
import {useScopedI18n} from "@/locales/client";

const Contact: React.FC = () => {
    const t = useScopedI18n('contact');

    const handleCopyEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigator.clipboard.writeText('romaincordier33160@gmail.com');
        let tooltip = document.getElementById('tooltip');
        if (!tooltip) {
            tooltip = document.createElement('span');
            tooltip.id = 'tooltip';
            document.body.appendChild(tooltip);
        }
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.style.left = `${event.clientX}px`;
        tooltip.style.display = 'block';

        setTimeout(() => {
            if (tooltip && tooltip.parentNode) {
                tooltip.style.display = 'none';
            }
        }, 2000);
    };

    return (
        <section id="contact" className="text-center sm:text-left ">
            <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>
            <p className="text-gray-500 dark:text-gray-300">
                {t('description')} <a href="mailto:romaincordier33160@gmail.com" className="bg-gradient-to-r from-pink-400 to-purple-400 dark:from-pink-500 dark:to-purple-500 bg-clip-text text-transparent relative">{t('email')}</a>
                <button onClick={handleCopyEmail} className="group">
                    <FontAwesomeIcon icon={faCopy} className="mx-2 relative group" />
                </button>
                <span id="tooltip" className="absolute p-1 bg-transparent dark:text-gray-300 text-gray-500 text-xs rounded" style={{ display: 'none', position: 'fixed' }}>{t('copied')}</span>
            </p>
            <div className="flex justify-center sm:justify-start mt-4 space-x-4">
                <a href="https://x.com/Rom1_fcgb" className="text-pink-400 dark:text-pink-200" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} className="text-2xl" />
                </a>
                <a href="https://www.linkedin.com/in/romain-cordier-dev-web/" className="text-pink-600 dark:text-pink-400" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                </a>
                <a href="https://github.com/Romainub87" className="text-purple-600 dark:text-purple-400" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faSquareGithub} className="text-2xl" />
                </a>
                <a href="https://www.malt.fr/profile/romaincordier2" className="text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">
                    <Image src={maltImage} alt="Malt" width={72} height={32} />
                </a>
            </div>
        </section>
    );
};

export default Contact;