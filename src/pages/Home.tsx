import { Canvas } from "@react-three/fiber";
import InfoPanels from "src/components/overlay/InfoPanels";
import Scene from "src/components/canvas/Scene";
import StartupModal from "src/components/overlay/StartupModal";
import { useProgress } from "@react-three/drei";
import store from "src/data/store";

const Home = () => {
  const quality = store.useState((s) => s.userSettings.quality);
  const dpr =
    quality === "High"
      ? window.devicePixelRatio
      : quality === "Med"
      ? window.devicePixelRatio / 1.5
      : window.devicePixelRatio / 2.5;

  const progress = useProgress((state) => state.progress);
  const loading = progress < 100;

  return (
    <>
      <Canvas
        shadows={false}
        // shadows={quality === 'High'} // todo: enable this once I've fixed shadow rendering for both directional and point light types
        gl={{ antialias: false }}
        dpr={dpr}
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
