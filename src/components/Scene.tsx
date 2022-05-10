import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Stars, Stats } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { bodies } from "../data/bodies";
import store from "../data/store";
import Body from "./Body";
import { useFocusedBody, useShowDebugInfo, useTimeSpeedModifier } from "../hooks/settings";

const Scene = () => {
  const timeStepRef = useRef(0);
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  const [showDebugInfo] = useShowDebugInfo();
  const [focusedBody] = useFocusedBody();
  const [timeSpeedModifier] = useTimeSpeedModifier();

  useFrame(() => {
    const { paused } = store.getRawState();

    if (!paused) {
      const timeStep = timeSpeedModifier / 75;
      timeStepRef.current += Math.exp(timeStep) * 0.0000001;
    }

    // console.log(controlsRef.current);
    // console.log(controlsRef.current.getDistance());
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
          timeStepRef={timeStepRef}
          focused={focusedBody === body.displayName}
          {...body}
        />
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
