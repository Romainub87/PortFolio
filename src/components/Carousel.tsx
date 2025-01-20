'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import petanqueImage from '@/assets/petanque.jpg';
import worldImage from '@/assets/world.jpg';
import triFavoriteImage from '@/assets/tri-fav.png';
import woodeoImage from '@/assets/woodeo.png';
import { useScopedI18n } from '@/locales/client';

export default function Carousel() {
    const t = useScopedI18n('projects');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const projects = [
        { src: petanqueImage, alt: 'Petanquaton', title: t('0.title'), description: t('0.description') },
        { src: worldImage, alt: 'Countries API WebApp', title: t('1.title'), link: 'https://' + t('1.link'), description: t('1.description') },
        { src: triFavoriteImage, alt: 'Extended Tri de favoris', title: t('2.title'), description: t('2.description') },
        { src: woodeoImage, alt: 'Woodeo', title: t('3.title'), link: 'https://' + t('3.link'), description: t('3.description') },
    ];

    const handlePrev = () => {
        if (currentIndex > 0) updateIndex(currentIndex - 1);
    };

    const handleNext = useCallback(() => {
        updateIndex(currentIndex < projects.length - 1 ? currentIndex + 1 : 0);
    }, [currentIndex, projects.length]);

    useEffect(() => {
        const interval = setInterval(handleNext, 20000);
        return () => clearInterval(interval);
    }, [currentIndex, handleNext]);

    const updateIndex = (newIndex: number) => {
        setCurrentIndex(newIndex);
        setCurrentTranslate(newIndex * -100);
        setPrevTranslate(newIndex * -100);
    };

    const handleTouchStart = (index: number) => (event: React.TouchEvent) => {
        setIsDragging(true);
        setStartPos(event.touches[0].clientX);
        setCurrentTranslate(index * -100);
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        if (isDragging) setCurrentTranslate(prevTranslate + (event.touches[0].clientX - startPos));
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -50 && currentIndex < projects.length - 1) handleNext();
        else if (movedBy > 50 && currentIndex > 0) handlePrev();
        else updateIndex(currentIndex);
    };

    const handleMouseDown = (index: number) => (event: React.MouseEvent) => {
        setIsDragging(true);
        setStartPos(event.clientX);
        setCurrentTranslate(index * -100);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDragging) setCurrentTranslate(prevTranslate + (event.clientX - startPos));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -50 && currentIndex < projects.length - 1) handleNext();
        else if (movedBy > 50 && currentIndex > 0) handlePrev();
        else updateIndex(currentIndex);
    };

    return (
        <div
            className="relative h-96 w-full flex justify-center items-center dark:text-gray-100 overflow-hidden"
            ref={carouselRef}
            onMouseDown={handleMouseDown(currentIndex)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart(currentIndex)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="flex flex-row items-center transition-transform duration-500 ease-in-out transform"
                style={{ transform: `translateX(${currentTranslate}%)`, width: `${projects.length * 100}%` }}
            >
                {projects.map((image, index) => (
                    <div
                        key={index}
                        className={`w-full flex-shrink-0 flex flex-col items-center transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image src={image.src} alt={image.alt} className="rounded-lg w-5/6 bg-gray-900 dark:bg-transparent md:w-full h-auto max-w-md" />
                        <h3 className="text-2xl font-bold mt-4 text-center sm:text-left">
                            {image.title}
                            {image.link && (
                                <a href={`https://${image.link}`} className="text-blue-500 dark:text-blue-300 ml-2" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faUpRightFromSquare} className="text-xl " />
                                </a>
                            )}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 w-5/6 md:w-full max-w-lg text-justify"><strong>{image.title}</strong>{image.description}</p>
                    </div>
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