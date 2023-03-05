import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { AppProvider } from "../store/context";

import "../styles/reset.css";

const starJediFont = localFont({
  src: "../../public/fonts/Starjedi.ttf",
  variable: "--font-starjedi",
});

const sfPro = localFont({
  src: "../../public/fonts/SFPro.ttf",
  variable: "--font-sfpro",
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: "#F2D24E",
    bg: "#101010",
    danger: "#B32445",
    success: "#1A9024",
    blue: "#006E92",
    darkYellow: "#908B09",
    lowBlack: "#0B0808",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      <main className={`${starJediFont.variable} ${sfPro.variable} font-sans`}>
        <AppProvider {...pageProps}>
          <Component {...pageProps} />
        </AppProvider>
      </main>
    </ChakraProvider>
  );
}
