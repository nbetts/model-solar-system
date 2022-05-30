import { Canvas } from "@react-three/fiber";
import InfoPanels from "src/components/overlay/InfoPanels";
import Scene from "src/components/canvas/Scene";
import StartupModal from "src/components/overlay/StartupModal";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";

const Home = () => (
  <Suspense fallback={<LoadingOverlay visible />}>
    <Canvas
      shadows={false}
      gl={{ stencil: false, logarithmicDepthBuffer: true }}
      style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#030302" }}
    >
      <Scene />
    </Canvas>
    <InfoPanels />
    <StartupModal />
  </Suspense>
);

export default Home;
