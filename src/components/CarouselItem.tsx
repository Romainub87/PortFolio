import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { StaticImageData } from 'next/image';

interface CarouselItemProps {
    image: {
        src: StaticImageData;
        alt: string;
        title: string;
        description: string;
        link?: string;
    };
    index: number;
    currentIndex: number;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ image, index, currentIndex }) => {
    const [transform, setTransform] = useState('');
    const itemRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const { width, height } = rect;
            const rotateX = ((offsetY / height) - 0.5) * 20;
            const rotateY = ((offsetX / width) - 0.5) * -20;
            setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
    };

    const handleMouseLeave = () => {
        setTransform('');
    };

    return (
        <div
            ref={itemRef}
            key={index}
            className={`carousel-item w-full flex-shrink-0 flex flex-col items-center justify-center transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Image src={image.src} alt={image.alt} className="rounded-lg w-5/6 bg-gray-900 dark:bg-transparent md:w-full h-auto max-w-md" />
            <h3 className="text-2xl font-bold mt-4 text-center sm:text-left w-max">
                {image.title}
                {image.link && (
                    <a href={`https://${image.link}`} className="text-blue-500 dark:text-blue-300 ml-2" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faUpRightFromSquare} className="text-xl " />
                    </a>
                )}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 w-5/6 md:w-full max-w-lg text-justify overflow-hidden text-overflow-ellipsis whitespace-normal word-wrap-break-word">
                <strong>{image.title}</strong>{image.description}
            </p>
        </div>
    );
};

export default CarouselItem;