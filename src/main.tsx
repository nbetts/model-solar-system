import React from "react";
import ReactDOM from "react-dom/client";
import Scene from "./components/Scene";
import "./global.css";
import SettingsPanel from "./components/SettingsPanel";
import { Canvas } from "@react-three/fiber";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark", fontFamily: "'Space Grotesk', sans-serif" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <SettingsPanel />
      <Canvas shadows>
        <Scene />
      </Canvas>
    </MantineProvider>
  </React.StrictMode>
);
