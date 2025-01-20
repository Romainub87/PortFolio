'use client';
import './globals.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import profileImage from '@/assets/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon} from '@fortawesome/free-solid-svg-icons';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Cookies from 'js-cookie';
import {useScopedI18n} from "@/locales/client";
import {LocaleSelect} from "@/app/[locale]/localeSelect";

export default function Home() {
  const t = useScopedI18n('header');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const darkModeCookie = Cookies.get('darkMode');
    if (darkModeCookie) {
      setIsDarkMode(darkModeCookie === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    Cookies.set('darkMode', newDarkMode.toString(), { expires: 365 });
  };

  useEffect(() => {
    const words = [`${t('age')}`, `${t('city')}`, `${t('food')}`];
    let wordIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    const type = () => {
      if (isDeleting) {
        currentText = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = words[wordIndex].substring(0, charIndex + 1);
        charIndex++;
      }

      setDisplayText(currentText);

      if (!isDeleting && charIndex === words[wordIndex].length) {
        setTimeout(() => (isDeleting = true), 3000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      setTimeout(type, isDeleting ? 100 : currentText === '' ? 2000 : 150);
    };

    type();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
      <div className={`min-h-screen p-4 md:px-20 md:pb-0 md:pt-14 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-200 text-gray-900'} overflow-x-hidden transition-colors duration-500 ease-in-out`}>
        <header className="flex flex-col items-center sm:items-start mb-8 sm:mb-16">
          <Image
              className="rounded-full"
              src={profileImage}
              alt="Profile picture"
              width={150}
              height={150}
          />
          <h1 className="text-4xl font-bold mt-4 text-center sm:text-left overflow-hidden h-24 md:h-auto">Romain Cordier{displayText}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center sm:text-left">{t("metier")}</p>
        </header>

        <div className="absolute top-4 md:right-3 right-0 md:top-10 flex items-center justify-between md:justify-end w-full px-4 sm:px-10">
          <LocaleSelect />
          <button onClick={toggleDarkMode} className="p-2 px-0 mx-5">
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon } className="text-2xl text-gray-900 dark:text-gray-100 align-middle"/>
          </button>
        </div>

        <main className="flex flex-col gap-8 sm:gap-16">
          <About />
          <Projects />
          <Contact />
        </main>
      </div>
  );
}