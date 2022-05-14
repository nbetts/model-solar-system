import { Canvas } from "@react-three/fiber";
import InfoPanels from "../components/InfoPanels";
import Scene from "../components/Scene";
import StartupModal from "../components/StartupModal";

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
