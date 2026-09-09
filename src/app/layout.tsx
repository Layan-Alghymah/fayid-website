import type { Metadata } from "next";
import localFont from "next/font/local";
import { CANONICAL_URL, siteConfig } from "@/lib/site";
import "./globals.css";
const arabic = localFont({
  src: [
    { path: "../../public/fonts/arabic-regular.woff", weight: "400" },
    { path: "../../public/fonts/arabic-semibold.woff", weight: "600" },
  ],
  variable: "--font-arabic",
  display: "swap",
});
export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  ...(CANONICAL_URL
    ? {
        metadataBase: new URL(CANONICAL_URL),
        alternates: { canonical: CANONICAL_URL },
      }
    : {}),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "ar_SA",
    type: "website",
    ...(CANONICAL_URL
      ? {
          images: [
            {
              url: "/images/og.jpg",
              width: 1200,
              height: 630,
              alt: "فائض — من فائض إلى قيمة",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: CANONICAL_URL ? "summary_large_image" : "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    ...(CANONICAL_URL ? { images: ["/images/og.jpg"] } : {}),
  },
  icons: { icon: "/images/mark-transparent.png" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={arabic.variable}>{children}</body>
    </html>
  );
}
