import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";
import SettingsPanel from "../components/SettingsPanel";
import StartupModal from "../components/StartupModal";

const Home = () => (
  <>
    <Canvas shadows>
      <Scene />
    </Canvas>
    <SettingsPanel />
    <StartupModal />
  </>
);

export default Home;
