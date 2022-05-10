import React from "react";
import ReactDOM from "react-dom/client";
import { Global, MantineProvider, MantineThemeOverride } from "@mantine/core";
import Home from "./pages/Home";

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "orange",
  fontFamily: "'Space Grotesk', sans-serif",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Global
        styles={() => ({
          "#root": {
            height: "100vh",
            backgroundColor: "black",
          },
          hr: {
            width: "95%",
          },
        })}
      />
      <Home />
    </MantineProvider>
  </React.StrictMode>
);
