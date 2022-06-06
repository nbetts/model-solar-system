import { Canvas } from "@react-three/fiber";
import InfoPanels from "src/components/overlay/InfoPanels";
import Scene from "src/components/canvas/Scene";
import StartupModal from "src/components/overlay/StartupModal";
import { useProgress } from "@react-three/drei";

const Home = () => {
  const progress = useProgress((state) => state.progress);
  const loading = progress < 100;

  return (
    <>
      <Canvas
        shadows={false}
        style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#030302" }}
      >
        <Scene />
      </Canvas>
      {!loading && <InfoPanels />}
      <StartupModal loading={loading} />
    </>
  );
};

export default Home;
