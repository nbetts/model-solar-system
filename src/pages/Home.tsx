import { Canvas } from "@react-three/fiber";
import InfoPanels from "src/components/InfoPanels";
import Scene from "src/components/Scene";
import StartupModal from "src/components/StartupModal";

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
