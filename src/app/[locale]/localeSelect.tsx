'use client';

import { useChangeLocale, useCurrentLocale } from '@/locales/client';

export const LocaleSelect = () => {
    const currentLocale = useCurrentLocale();
    const changeLocale = useChangeLocale();

    return (
    <select id="countries"
            value={currentLocale}
            onChange={(e) => changeLocale(e.target.value as "fr" | "en")}
            className="outline-0 bg-gray-100 border-none text-gray-500 rounded-lg px-2.5 py-2 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-100">
        <option value="fr">Français</option>
        <option value="en">English</option>
    </select>
)
};