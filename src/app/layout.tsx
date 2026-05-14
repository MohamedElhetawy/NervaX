import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nerva-x.vercel.app"),
  title: {
    default: "Mohamed El Hetawy | NervaX - Systems Developer & AI Expert",
    template: "%s | NervaX"
  },
  description: "Portfolio of Mohamed El Hetawy (محمد الحيطاوي), CEO of NervaX. Expert systems developer specializing in AI integration, Next.js, Flutter, and scalable digital solutions.",
  keywords: [
    "Mohamed El Hetawy", "محمد الحيطاوي", "El Hetawy", "الحيطاوي",
    "NervaX", "NEVRA X", "شركة نيفرا إكس", "NervaX Hub",
    "Systems Developer", "مطور نظم", "Software Engineer", "مهندس برمجيات",
    "AI Integration", "الذكاء الاصطناعي", "Web Development", "تطوير الويب",
    "Next.js Developer", "Flutter Developer", "Django", "Python",
    "EduSmart", "Fit X", "Egypt", "مصر", "Desouk"
  ],
  authors: [{ name: "Mohamed El Hetawy", url: "https://nerva-x.vercel.app/" }],
  creator: "Mohamed El Hetawy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nerva-x.vercel.app/",
    title: "Mohamed El Hetawy | CEO of NervaX",
    description: "Discover the portfolio of Mohamed El Hetawy (محمد الحيطاوي), Systems Developer & Founder of NervaX. Showcasing AI, Next.js, and innovative digital projects.",
    siteName: "NervaX",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed El Hetawy - NervaX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed El Hetawy | NervaX",
    description: "Systems developer & AI Expert based in Egypt. CEO of NervaX.",
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/logo.ico",
  },
  verification: {
    google: "DztqohfeJCReh3F8deR2b87Bg67Bz6WFWOyjYJrHH5E",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdPerson = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Mohamed El Hetawy",
    "alternateName": "محمد الحيطاوي",
    "url": "https://nerva-x.vercel.app",
    "image": "https://nerva-x.vercel.app/profile.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/mohamed-elhetawy-402019208/",
      "https://www.facebook.com/medoAlhetawy/"
    ],
    "jobTitle": "Systems Developer & AI Expert",
    "knowsAbout": ["AI Integration", "Next.js", "Flutter", "Python", "Django", "System Architecture"],
    "worksFor": {
      "@type": "Organization",
      "name": "NervaX"
    }
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NervaX",
    "alternateName": "نيفرا إكس",
    "url": "https://nerva-x.vercel.app",
    "logo": "https://nerva-x.vercel.app/logo.ico",
    "description": "AI-powered digital solutions and innovative projects",
    "founder": {
      "@type": "Person",
      "name": "Mohamed El Hetawy",
      "url": "https://nerva-x.vercel.app"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG",
      "addressLocality": "Egypt"
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-navy-900 text-neutral-50 selection:bg-gold-500/30 selection:text-gold-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
