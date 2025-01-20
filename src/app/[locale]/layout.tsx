import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/app/[locale]/providers";
import { ReactNode } from "react";
import { setStaticParamsLocale} from "next-international/server";
import { getStaticParams } from '@/locales/server';

export async function generateStaticParams() {
    return getStaticParams();
}

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Romain Cordier's portfolio",
};

export default async function RootLayout({
                                             children,
                                             params,
                                         }: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    setStaticParamsLocale(locale);

    return (
        <html lang={locale}>
        <body className="antialiased">
        <Providers locale={locale}>
            {children}
        </Providers>
        </body>
        </html>
    );
}