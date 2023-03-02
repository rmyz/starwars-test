import "../styles/reset.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const starJediFont = localFont({
  src: "../../public/fonts/Starjedi.ttf",
  variable: "--font-starjedi",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${starJediFont.variable} font-sans`}>
      <Component {...pageProps} />;
    </main>
  );
}
