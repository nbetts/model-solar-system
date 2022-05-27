import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import store, { updateAppSetting } from "src/data/store";
import SpaceBackground from "./SpaceBackground";
import DebugInfo from "./DebugInfo";
import PostProcessingEffects from "./PostProcessingEffects";
import AstronomicalBody from "./AstronomicalBody";

const Scene = () => {
  const actualScale = store.useState((s) => s.userSettings.actualScale);
  const solarSystemData = store.useState((s) => s.appSettings.solarSystemData);
  const sun = actualScale ? solarSystemData.real : solarSystemData.toon;
  const cameraRef = useRef<PerspectiveCameraProps>(null!);
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  const maxDistance = actualScale ? 100000000000 : 5000000;
  const cameraFar = actualScale ? maxDistance * 1.2 : maxDistance * 30;
  const spaceBackgroundDistance = actualScale ? maxDistance : maxDistance * 10;
  const spaceBackgroundStarTwinkle = actualScale ? 0.017 : 0.013;

  useFrame(() => {
    const { appSettings, userSettings } = store.getRawState();

    if (appSettings.timeStepModifier !== userSettings.timeSpeedModifier) {
      updateAppSetting("timeStepModifier", userSettings.timeSpeedModifier);
      updateAppSetting("timeStep", Math.exp(userSettings.timeSpeedModifier * 20) * 0.00001);
    }

    const cameraDistance = controlsRef.current.getDistance();

    if (cameraDistance !== appSettings.cameraDistance) {
      updateAppSetting("cameraDistance", cameraDistance);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[3, 1, 3]} near={100} far={cameraFar} />
      <OrbitControls ref={controlsRef} maxDistance={maxDistance} />
      <SpaceBackground distance={spaceBackgroundDistance} starTwinkle={spaceBackgroundStarTwinkle} />
      <ambientLight color={sun.color} intensity={0.02} />
      <AstronomicalBody {...sun} cameraRef={cameraRef} controlsRef={controlsRef} />
      <DebugInfo />
      <PostProcessingEffects />
    </>
  );
};

export default Scene;
