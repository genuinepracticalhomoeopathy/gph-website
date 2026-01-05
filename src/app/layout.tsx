import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../../components/Footer";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genuine Practical Homoeopathy - Expert Homeopathic Education & Training",
  description: "Discover comprehensive homeopathic education with Genuine Practical Homoeopathy. Expert-led courses, practical training, and professional certification in homeopathic medicine.",
  keywords: "homeopathy, homeopathic education, homeopathic training, homeopathic courses, homeopathic medicine, alternative medicine education",
  authors: [{ name: "Dr. Santosh Mahanwar" }],
  creator: "Dr. Santosh Mahanwar",
  publisher: "Genuine Practical Homoeopathy",
  robots: "index, follow",
  alternates: {
    canonical: "https://genuinepracticalhomoeopathy.com"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://genuinepracticalhomoeopathy.com",
    siteName: "Genuine Practical Homoeopathy",
    title: "Genuine Practical Homoeopathy - Expert Homeopathic Education & Training",
    description: "Discover comprehensive homeopathic education with Genuine Practical Homoeopathy. Expert-led courses, practical training, and professional certification in homeopathic medicine.",
    images: [
      {
        url: "/sq_logo.png",
        width: 1200,
        height: 630,
        alt: "Genuine Practical Homoeopathy Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Genuine Practical Homoeopathy - Expert Homeopathic Education & Training",
    description: "Discover comprehensive homeopathic education with Genuine Practical Homoeopathy. Expert-led courses, practical training, and professional certification in homeopathic medicine.",
    images: ["/sq_logo.png"],
    creator: "@genuinepracticalhomoeopathy",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#179E25",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <Analytics/>
        <Footer />
      </body>
    </html>
  );
}
