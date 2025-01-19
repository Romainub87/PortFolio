'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight, faUpRightFromSquare} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import petanqueImage from '@/assets/petanque.jpg';
import worldImage from '@/assets/world.jpg';
import triFavoriteImage from '@/assets/tri-fav.png';
import woodeoImage from '@/assets/woodeo.png';

const projects = [
    {
        src: petanqueImage,
        alt: 'Petanquaton',
        title: 'Pétanquaton',
        description: ' is an Android mobile application developed in Kotlin, designed for pétanque enthusiasts. It allows you to track game scores in real-time between multiple players and organize and manage tournaments involving many participants.',
    },
    {
        src: worldImage,
        alt: 'Countries API WebApp',
        title: 'Countries API WebApp',
        link: 'romainub87.github.io/Application_countries_API/',
        description: ' is a web application that allows users to search for countries and view detailed information (population, capital, region, languages, currencies, etc.) using an API. ' +
            'It features an intuitive interface with dedicated pages for each country. '
    },
    {
        src: triFavoriteImage,
        alt: 'Extended Tri de favoris',
        title: 'Extension Tri de favoris',
        description: ' is a browser extension that enhances the bookmark management experience in Google Chrome. It allows users to sort bookmarks by name, date, or URL, and search for bookmarks by name or URL. ' +
            'It also provides the ability to export bookmarks to a file and import bookmarks from a file'
    },
    {
        src: woodeoImage,
        alt: 'Woodeo',
        title: 'Woodeo',
        link: 'woodeo.valentinraillard.fr/',
        description: ' is a web app that allows series enthusiasts to track their favorite shows, ' +
            'discover new ones, and share their opinions with a community. ' +
            'The intuitive interface and extensive catalog make it an essential tool for all series lovers.'
    },
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(handleNext, 20000); // Intervalle autoplay
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handlePrev = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            updateIndex(newIndex);
        }
    };

    const handleNext = () => {
        const newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
        updateIndex(newIndex);
    };

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
        if (isDragging) {
            const diff = event.touches[0].clientX - startPos;
            setCurrentTranslate(prevTranslate + diff);
        }
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
        if (isDragging) {
            const diff = event.clientX - startPos;
            setCurrentTranslate(prevTranslate + diff);
        }
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
            className="carousel relative h-96 w-full flex justify-center items-center dark:bg-gray-900 dark:text-gray-100 overflow-hidden"
            ref={carouselRef}
            onMouseDown={handleMouseDown(currentIndex)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart(currentIndex)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="carousel-inner flex flex-row items-center transition-transform duration-500 ease-in-out transform"
                style={{ transform: `translateX(${currentTranslate}%)`, width: `${projects.length * 100}%` }}
            >
                {projects.map((image, index) => (
                    <div
                        key={index}
                        className={`w-full flex-shrink-0 flex flex-col items-center transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ width: '100%' }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            className="rounded-lg shadow-lg w-full h-auto max-w-md"
                        />
                        <h3 className="text-2xl font-bold mt-4 text-center sm:text-left">
                            {image.title}
                            {image.link && (
                                <a href={`https://${image.link}`} className="text-blue-500 dark:text-blue-300 ml-2" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faUpRightFromSquare} className="text-xl " />
                                </a>
                            )}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-300 mt-2 max-w-lg text-justify"><strong>{image.title}</strong>{image.description}</p>
                    </div>
                ))}
            </div>
            {currentIndex > 0 && (
                <button onClick={handlePrev} className="hidden md:block carousel-control next absolute left-0 top-0 h-full w-1/12 bg-transparent rounded-2xl text-white p-2 hover:bg-gray-800/50 dark:hover:bg-gray-700/50">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-3xl"/>
                </button>
            )}
            {currentIndex < projects.length - 1 && (
                <button onClick={handleNext} className="hidden md:block carousel-control next absolute right-0 top-0 h-full w-1/12 bg-transparent rounded-2xl text-white p-2 hover:bg-gray-800/50 dark:hover:bg-gray-700/50">
                    <FontAwesomeIcon icon={faArrowRight} className="text-3xl" />
                </button>
            )}
        </div>
    );
}