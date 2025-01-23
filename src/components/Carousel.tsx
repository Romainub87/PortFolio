import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CarouselItem from './CarouselItem';
import petanqueImage from '@/assets/petanque.jpg';
import worldImage from '@/assets/world.jpg';
import triFavoriteImage from '@/assets/tri-fav.png';
import woodeoImage from '@/assets/woodeo.png';
import { useScopedI18n } from '@/locales/client';

export default function Carousel() {
    const t = useScopedI18n('projects');
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const projects = [
        { src: petanqueImage, alt: 'Petanquaton', title: t('0.title'), description: t('0.description') },
        { src: worldImage, alt: 'Countries API WebApp', title: t('1.title'), link: 'https://' + t('1.link'), description: t('1.description') },
        { src: triFavoriteImage, alt: 'Extended Tri de favoris', title: t('2.title'), description: t('2.description') },
        { src: woodeoImage, alt: 'Woodeo', title: t('3.title'), link: 'https://' + t('3.link'), description: t('3.description') },
    ];

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleNext = useCallback(() => {
        setCurrentIndex(currentIndex < projects.length - 1 ? currentIndex + 1 : 0);
    }, [currentIndex, projects.length]);

    useEffect(() => {
        const interval = setInterval(handleNext, 20000);
        return () => clearInterval(interval);
    }, [currentIndex, handleNext]);

    return (
        <div
            className="relative h-96 w-full flex justify-center items-center dark:text-gray-100 overflow-hidden"
            ref={carouselRef}
        >
            <div
                className="flex flex-row items-center transition-transform duration-500 ease-in-out transform"
                style={{ transform: `translateX(${currentIndex * -100}%)`, width: `${projects.length * 100}%` }}
            >
                {projects.map((image, index) => (
                    <CarouselItem key={index} image={image} index={index} currentIndex={currentIndex} />
                ))}
            </div>
            {currentIndex > 0 && (
                <button onClick={handlePrev} className="hidden md:block next absolute left-0 top-0 h-full w-1/12 bg-transparent rounded-2xl text-gray-900 dark:text-gray-200 p-2 hover:bg-gray-400/50 dark:hover:bg-gray-700/50 transition-bg-opacity duration-300 bg-opacity-25 hover:bg-opacity-75">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-3xl"/>
                </button>
            )}
            {currentIndex < projects.length - 1 && (
                <button onClick={handleNext} className="hidden md:block next absolute right-0 top-0 h-full w-1/12 bg-transparent rounded-2xl text-gray-900 dark:text-gray-200 p-2 hover:bg-gray-400/50 dark:hover:bg-gray-700/50 transition-bg-opacity duration-300 bg-opacity-25 hover:bg-opacity-75">
                    <FontAwesomeIcon icon={faArrowRight} className="text-3xl" />
                </button>
            )}
        </div>
    );
}