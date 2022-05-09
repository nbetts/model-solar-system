import React from "react";
import ReactDOM from "react-dom/client";
import Scene from "./components/Scene";
import "modern-normalize/modern-normalize.css";
import "./global.css";
import SettingsPanel from "./components/SettingsPanel";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsPanel />
    <Canvas shadows>
      <Scene />
    </Canvas>
  </React.StrictMode>
);
