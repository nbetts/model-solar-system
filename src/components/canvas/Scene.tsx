import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { createRef, useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { bodies } from "src/data/bodies";
import store, { updateAppSetting } from "src/data/store";
import Body from "./Body";
import SpaceBackground from "./SpaceBackground";
import { Mesh } from "three/src/objects/Mesh";
import DebugInfo from "./DebugInfo";
import PostProcessingEffects from "./PostProcessingEffects";

const Scene = () => {
  const timeStepRef = useRef(1300000);
  const cameraRef = useRef<PerspectiveCameraProps>(null!);
  const controlsRef = useRef<OrbitControlsImpl>(null!);
  const bodyRefs = bodies.map(() => createRef<Mesh>());

  useFrame(() => {
    const { appSettings, userSettings } = store.getRawState();

    if (userSettings.timeSpeedModifier > 0) {
      const timeStep = userSettings.timeSpeedModifier * 20;
      timeStepRef.current += Math.exp(timeStep) * 0.00001;
    }

    const cameraDistance = controlsRef.current.getDistance();

    if (cameraDistance !== appSettings.cameraDistance) {
      updateAppSetting("cameraDistance", cameraDistance);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault near={0.0001} far={110000} />
      <OrbitControls ref={controlsRef} maxDistance={100000} />
      <SpaceBackground />
      {bodies.map((body, index) => (
        <Body
          key={index}
          index={index}
          bodyRef={bodyRefs[index]}
          cameraRef={cameraRef}
          controlsRef={controlsRef}
          timeStepRef={timeStepRef}
          {...body}
        />
      ))}
      <DebugInfo />
      <PostProcessingEffects />
    </>
  );
};

export default Scene;
