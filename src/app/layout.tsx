import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/lib/store";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PropertyCompareModal } from "@/components/land/PropertyCompareModal";
import { generateOrganizationSchema } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Online Land Sales | Guaranteed Seller Financed Land Across the USA",
  description:
    "Buy affordable U.S. vacant land with guaranteed seller financing, no credit checks, low down payments, transparent terms, and a 90-day money-back guarantee. Founded 2004.",
  keywords: [
    "land for sale",
    "seller financed land",
    "owner financed land",
    "off-grid land",
    "homestead land",
    "arizona land for sale",
    "colorado land for sale",
    "texas land for sale",
  ],
  authors: [{ name: "Online Land Sales, LLC" }],
  openGraph: {
    title: "Online Land Sales | Guaranteed Seller Financed Land Across the USA",
    description:
      "Buy affordable U.S. vacant land with guaranteed seller financing, no credit checks, and a 90-day money-back guarantee.",
    url: "https://onlinelandsales.com",
    siteName: "Online Land Sales",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "American Open Land For Sale",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <PropertyCompareModal />
        </StoreProvider>
      </body>
    </html>
  );
}
