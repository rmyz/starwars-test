import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

import "../styles/reset.css";

const starJediFont = localFont({
  src: "../../public/fonts/Starjedi.ttf",
  variable: "--font-starjedi",
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <main className={`${starJediFont.variable} font-sans`}>
        <Component {...pageProps} />;
      </main>
    </ChakraProvider>
  );
}
