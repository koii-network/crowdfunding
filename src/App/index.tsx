import { HashRouter, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
// routes
import { Routes } from "routes";
// providers
import { QueryClient, QueryClientProvider } from "react-query";
import { FinnieProvider } from "components/finnie";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryParamProvider } from "use-query-params";
// theme
import { theme } from "./theme";
// ui
import { SEO } from "components/widgets";
// fonts
import "@fontsource/ibm-plex-sans";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      <SEO />
      {/* Theme (Chakra UI) */}
      <ChakraProvider theme={theme}>
        {/* React Query Provider */}
        <QueryClientProvider client={queryClient}>
          {/* Finnie Provider */}
          <FinnieProvider>
            <HashRouter>
              {/* Query Params */}
              <QueryParamProvider ReactRouterRoute={Route}>
                <Routes />
              </QueryParamProvider>
            </HashRouter>
          </FinnieProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};
