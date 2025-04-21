import { useMemo } from "react";
import { deepmerge } from "@mui/utils";
import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline, GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import MainRoutes from "./routes/MainRoutes";

import { NewTheme, themeSettings } from "./theme";
import MainRoutes from "./routes/MainRoutes";
import { AuthProvider } from "./store/authContext";
import { ErrorProvider } from "./components/context/ErrorContextProvider";
import GlobalError from "./components/GlobalError/GlobarError";

function App() {
  const customTheme = deepmerge(themeSettings(), NewTheme);
  const theme = useMemo(() => createTheme(customTheme), [customTheme]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ErrorProvider>
      <Box>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                  styles={{
                    "@global": {
                      "html, body, #root": {
                        height: "100%",
                        width: "100%",
                      },
                    },
                  }}
                />

                <MainRoutes />
                <GlobalError />
              </ThemeProvider>
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </Box>
    </ErrorProvider>
  );
}

export default App;
