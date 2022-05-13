import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { createRef, useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { bodies } from "../data/bodies";
import store from "../data/store";
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

    if (!appSettings.paused) {
      const timeStep = userSettings.timeSpeedModifier * 40;
      timeStepRef.current += Math.exp(timeStep) * 0.0000001;
    }

    // console.log(controlsRef.current);
    // console.log(controlsRef.current.getDistance());
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault near={0.0001} far={100000000} />
      {/* todo: add onChange to OrbitControls to track and display current zoom level (e?.target?.getDistance()) */}
      <OrbitControls ref={controlsRef} />
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
