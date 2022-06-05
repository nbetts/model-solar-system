import ReactDOM from "react-dom/client";
import { Global, MantineProvider, MantineThemeOverride } from "@mantine/core";
import Home from "./pages/Home";

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "orange",
  fontFamily: "'Space Grotesk', sans-serif",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <Global
      styles={(theme) => ({
        "#root": {
          // height: "100vh",
          // backgroundColor: "#030302",
        },
        hr: {
          borderColor: theme.colors.dark[3],
          width: "95%",
        },
        ".canvas-body-object p": {
          border: "1px solid black",
          padding: "2px 6px",
          borderRadius: "4px",
          backgroundColor: theme.colors.dark[6],
          opacity: 0.8,
          userSelect: "none",
          ":hover": {
            cursor: "pointer",
          },
        },
      })}
    />
    <Home />
  </MantineProvider>
);
