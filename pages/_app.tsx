import type { AppProps } from "next/app";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "@/app/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${playfair.variable} ${sourceSans.variable} antialiased font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}

