import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { DrawerSidebarProvider } from "../contexts/DrawerSidebarContext";
import { theme } from "../styles/theme";
import { makeServer } from "../services/mirage";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DrawerSidebarProvider>
        <Component {...pageProps} />
      </DrawerSidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp;
