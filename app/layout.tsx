import type { Metadata } from "next";
import Script from "next/script";
import { I18nProvider } from "./i18n/context";
import "./globals.css";

const SITE_URL = "https://flowdive.app";
const DESCRIPTION =
  "Block distracting sites and apps across Chrome, desktop, and Android. Dive into deep work with Flowdive.";

// GA4 측정 ID — Vercel/배포 환경에서 환경변수로 주입. 미설정 시 GA 스크립트 자체가 로드되지 않음.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flowdive — Dive into flow",
    template: "%s — Flowdive",
  },
  description: DESCRIPTION,
  applicationName: "Flowdive",
  keywords: [
    "focus app",
    "site blocker",
    "deep work",
    "productivity",
    "Chrome extension",
    "Android focus app",
    "block distracting websites",
    "집중 앱",
    "사이트 차단",
    "딥다이브",
    "플로우다이브",
  ],
  authors: [{ name: "Flowdive" }],
  openGraph: {
    title: "Flowdive — Dive into flow",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Flowdive",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR", "ja_JP", "zh_CN", "es_ES", "de_DE"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowdive — Dive into flow",
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      ko: SITE_URL,
      ja: SITE_URL,
      "zh-CN": SITE_URL,
      es: SITE_URL,
      de: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
};

// SoftwareApplication 스키마 — Google 검색 결과에 제품 카드 (별점/가격/카테고리) 표시 가능.
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Flowdive",
  description: DESCRIPTION,
  url: SITE_URL,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Windows, macOS, Android, Chrome",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free",
    },
    {
      "@type": "Offer",
      price: "4.9",
      priceCurrency: "USD",
      name: "Pro Monthly",
    },
    {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
      name: "Pro Yearly",
    },
  ],
  aggregateRating: undefined, // 실제 리뷰 수집 후 추가
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: 브라우저 확장프로그램이 <html> 에 속성을 박는 경우
  //   (예: extension-installed="true") hydration mismatch 발생. 정상 동작이라 무시 권장.
  //   Next.js 공식 권고.
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script
          id="ld-software"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="min-h-full">
        <I18nProvider>{children}</I18nProvider>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}