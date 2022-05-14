import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { createRef, useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { bodies } from "../data/bodies";
import store, { updateAppSetting } from "../data/store";
import Body from "./Body";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import SpaceBackground from "./SpaceBackground";
import { Mesh } from "three/src/objects/Mesh";

const Scene = () => {
  const showDebugInfo = store.useState((s) => s.userSettings.showDebugInfo);
  const enableGodRays = store.useState((s) => s.userSettings.enableGodRays);

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

    if (userSettings.showDebugInfo && cameraDistance !== appSettings.cameraDistance) {
      updateAppSetting("cameraDistance", cameraDistance);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault near={0.0001} far={110000} />
      <OrbitControls ref={controlsRef} maxDistance={100000} />
      <SpaceBackground />
      {bodies.map((body, index) => (
        <Body key={index} cameraRef={cameraRef} controlsRef={controlsRef} timeStepRef={timeStepRef} {...body} />
      ))}
      {showDebugInfo && (
        <>
          <Stats />
          <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
            <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="white" />
          </GizmoHelper>
        </>
      )}
    </>
  );
};

export default Scene;
