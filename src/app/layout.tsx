import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/ui/app-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global metadata will be generated dynamically by individual pages
// This layout focuses on global head elements and structure

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Essential meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0066cc" />
        <meta name="format-detection" content="telephone=no" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/pool/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/pool/images/uploads/logo.jpg"
        />
        <link rel="manifest" href="/pool/manifest.json" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Security and compatibility */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* App metadata */}
        <meta name="application-name" content="Piscine Azur" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Piscine Azur" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppHeader />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
