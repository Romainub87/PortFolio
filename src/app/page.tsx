'use client';
import './globals.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Carousel from '@/components/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import profileImage from '@/assets/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import {
  faSymfony,
  faAngular,
  faLinkedin,
  faXTwitter,
  faSquareGithub,
  faPhp,
  faSquareJs
} from '@fortawesome/free-brands-svg-icons';
import Cookies from 'js-cookie';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
      <div className="min-h-screen p-4 md:px-20 md:pb-0 md:pt-14 dark:bg-gray-900 dark:text-gray-100 overflow-x-hidden">
        <header className="flex flex-col items-center sm:items-start mb-8 sm:mb-16">
          <Image
              className="rounded-full"
              src={profileImage}
              alt="Profile picture"
              width={150}
              height={150}
          />
          <h1 className="text-4xl font-bold mt-4 text-center sm:text-left">Romain Cordier</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center sm:text-left">Web Developer</p>
        </header>

        <button onClick={toggleDarkMode} className="absolute top-4 right-4 sm:top-10 sm:right-10 p-2 text-white">
          <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} className="text-2xl align-middle"/>
        </button>

        <main className="flex flex-col gap-8 sm:gap-16">
          <section id="about" className="text-center sm:text-left max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-gray-500 dark:text-gray-300 text-justify">
              I am a 22-year-old web developer passionate about creating high-performance and modern applications.
              I am proficient in <FontAwesomeIcon icon={faPhp} className="fa-2xl" /> and JavaScript <FontAwesomeIcon icon={faSquareJs} className="fa-lg"/> / TypeScript, as well as frameworks like Symfony <FontAwesomeIcon icon={faSymfony} className="fa-lg" />, Angular <FontAwesomeIcon icon={faAngular} className="fa-lg" />, and jQuery.
              Currently doing an apprenticeship at
              <a href="https://www.sully-group.com/en/" className="bg-gradient-to-r from-pink-400 to-purple-400 dark:from-pink-500 dark:to-purple-500 bg-clip-text text-transparent"> Sully Group </a>
              and in my first year of a master&#39;s degree, I combine theory and practice to design robust and tailored solutions.
              Always curious and motivated, I am ready to take on new challenges to turn your ideas into concrete projects.
            </p>
          </section>

          <section id="projects" className="text-center sm:text-left py-8">
            <Carousel />
          </section>

          <section id="contact" className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-gray-500 dark:text-gray-300">
              Feel free to reach out to me via email at <a href="mailto:romaincordier33160@gmail.com" className="bg-gradient-to-r from-pink-400 to-purple-400 dark:from-pink-500 dark:to-purple-500 bg-clip-text text-transparent">romaincordier33160@gmail.com</a>.
            </p>
            <div className="flex justify-center sm:justify-start mt-4 space-x-4">
              <a href="https://x.com/Rom1_fcgb" className="text-pink-400 dark:text-pink-200">
                <FontAwesomeIcon icon={faXTwitter} className="text-2xl text-pink-400 dark:text-pink-200" />
              </a>
              <a href="https://www.linkedin.com/in/romain-cordier-dev-web/" className="">
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-pink-600 dark:text-pink-400" />
              </a>
              <a href="https://github.com/Romainub87" className="text-purple-600 dark:text-purple-400">
                <FontAwesomeIcon icon={faSquareGithub} className="text-2xl text-purple-600 dark:text-purple-400" />
              </a>
            </div>
          </section>
        </main>
      </div>
  );
}