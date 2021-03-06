import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "react-query/devtools";
import { DrawerSidebarProvider } from "../contexts/DrawerSidebarContext";
import { theme } from "../styles/theme";
import { makeServer } from "../services/mirage";
import { QueryClientProvider, QueryClient } from "react-query";
import { queryClient } from "../services/react-query/queryClient";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <DrawerSidebarProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </DrawerSidebarProvider>
    </ChakraProvider>
  );
}

export default MyApp;
