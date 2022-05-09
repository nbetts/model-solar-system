import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { bodies } from "../data/bodies";
import store from "../data/store";
import Body from "./Body";

const Scene = () => {
  const focusedBody = store.useState((s) => s.settings.focusedBody);
  const showDebugInfo = store.useState((s) => s.settings.showDebugInfo);
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  useFrame(() => {
    store.update((s) => {
      if (!s.settings.paused) {
        const timeStep = s.settings.timeSpeedModifier / 75;
        s.time += Math.exp(timeStep) * 0.0000001;
      }
    });
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[10, 10, 30]} near={0.0001} far={100000000} />
      {/* todo: add onChange to OrbitControls to track and display current zoom level (e?.target?.getDistance()) */}
      <OrbitControls ref={controlsRef} />
      <Stars radius={10000} depth={100000} count={20000} factor={1200} />
      {bodies.map((body, index) => (
        <Body
          key={index}
          controlsRef={controlsRef}
          focused={focusedBody === body.displayName}
          {...body}
        />
      ))}
      {showDebugInfo && (
        <>
          <Stats />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="white" />
          </GizmoHelper>
        </>
      )}
    </>
  );
};

export default Scene;
