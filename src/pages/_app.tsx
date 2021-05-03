import { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { DrawerSidebarProvider } from "../contexts/DrawerSidebarContext";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DrawerSidebarProvider>
        <Component {...pageProps} />
      </DrawerSidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp;
