import { AppProps } from "next/app";
import "../globals.css";
import { GlobalStyles } from "twin.macro";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { AuthProvider } from "../context/AuthContext";
// This default export is required in a new `pages/_app.js` file.
export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}
