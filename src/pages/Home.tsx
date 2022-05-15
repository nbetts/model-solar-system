import { Canvas } from "@react-three/fiber";
import InfoPanels from "src/components/overlay/InfoPanels";
import Scene from "src/components/canvas/Scene";
import StartupModal from "src/components/overlay/StartupModal";

const Home = () => (
  <>
    <Canvas shadows gl={{ logarithmicDepthBuffer: true }}>
      <Scene />
    </Canvas>
    <InfoPanels />
    <StartupModal />
  </>
);

export default Home;
