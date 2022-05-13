import { Html, Line, LineProps, useTexture } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Vector3 } from "three/src/math/Vector3";
import { Mesh } from "three/src/objects/Mesh";
import { BodyType } from "../data/bodies";
import store from "../data/store";

type BodyProps = {
  timeStepRef: MutableRefObject<number>;
  cameraRef: MutableRefObject<PerspectiveCameraProps>;
  controlsRef: MutableRefObject<OrbitControlsImpl>;
} & BodyType;

const Body = (props: BodyProps) => {
  const showLabels = store.useState((s) => s.userSettings.showLabels);
  const showOrbitPaths = store.useState((s) => s.userSettings.showOrbitPaths);
  const showWireframes = store.useState((s) => s.userSettings.showWireframes);
  const focusedBody = store.useState((s) => s.userSettings.focusedBody);
  const focused = focusedBody === props.displayName;

  const bodyRef = useRef<Mesh>(null!);
  const orbitPathRef = useRef<LineProps>(null!);
  const texture = useTexture(props.textureSrc);
  const [orbitPathPoints, setOrbitPathPoints] = useState<Vector3[]>([]);

  /**
   * Initialize scale, position and orbit paths.
   */
  useEffect(() => {
    const scale = props.diameter * 0.0000001;
    bodyRef.current.scale.x = scale;
    bodyRef.current.scale.y = scale;
    bodyRef.current.scale.z = scale;
    bodyRef.current.position.x = props.distanceFromSun;

    const points = new Array(200);

    for (let i = 0; i < points.length; i++) {
      const step = (i / (points.length - 1)) * Math.PI * 2;
      const x = props.distanceFromSun * Math.sin(step);
      const z = props.distanceFromSun * Math.cos(step);
      points[i] = [x, 0, z];
    }

    setOrbitPathPoints(points);
  }, [props.diameter, props.distanceFromSun]);

  useFrame(() => {
    const { appSettings, userSettings } = store.getRawState();
    const oldBodyPosition = new Vector3();
    bodyRef.current.getWorldPosition(oldBodyPosition);

    if (!appSettings.paused) {
      const timeStep = props.timeStepRef.current;
      const orbitalPeriodStep = (1 / props.orbitalPeriod) * Math.PI * 2 * timeStep;
      const rotationPeriodStep = (24 / props.rotationPeriod) * Math.PI * 2 * timeStep; // 24 hours in a day

      if (props.distanceFromSun) {
        bodyRef.current.position.x = props.distanceFromSun * Math.sin(orbitalPeriodStep);
        // bodyRef.current.position.y = props.distanceFromSun * Math.sin(orbitalPeriodStep) * props.orbitalInclination;
        bodyRef.current.position.z = props.distanceFromSun * Math.cos(orbitalPeriodStep);
      }

      bodyRef.current.rotation.y = rotationPeriodStep;

      // Rotate the orbit path along with the body so that an orbit path point is always in the body.
      // This means the body will always appear to be on th orbit path, even for large orbits.
      if (orbitPathRef.current) {
        (orbitPathRef as any).current.rotation.y = orbitalPeriodStep;
      }
    }

    if (userSettings.focusedBody === props.displayName) {
      const cameraPosition = props.cameraRef.current.position as Vector3;
      const bodyPosition = new Vector3();
      bodyRef.current.getWorldPosition(bodyPosition);
      props.controlsRef.current.target = bodyPosition;

      if (appSettings.focusingBody) {
        cameraPosition.x = bodyPosition.x + bodyRef.current.scale.x * 4;
        cameraPosition.y = bodyPosition.y + bodyRef.current.scale.y * 1.25;
        cameraPosition.z = bodyPosition.z + bodyRef.current.scale.z * 4;
        updateAppSetting("focusingBody", false);
      } else {
        cameraPosition.x += bodyPosition.x - oldBodyPosition.x;
        cameraPosition.y += bodyPosition.y - oldBodyPosition.y;
        cameraPosition.z += bodyPosition.z - oldBodyPosition.z;
      }
    }
  });

  return (
    <>
      <object3D rotation={[props.orbitalInclination, 0, 0]}>
        {showOrbitPaths && orbitPathPoints.length > 0 && (
          <Line ref={orbitPathRef as any} points={orbitPathPoints} color={props.orbitColor} />
        )}
        <mesh ref={bodyRef} position={[0, 0, props.distanceFromSun]}>
          {props.isLight && bodyRef.current && (
            <>
              <ambientLight color={props.color} intensity={0.01} />
              <pointLight color={props.color} intensity={3} decay={2} />
            </>
          )}
          <sphereGeometry args={[1, 64, 32]} />
          <meshPhongMaterial wireframe={showWireframes} map={texture} emissive={props.isLight ? props.color : 0x000} />
          {showLabels && !props.isLight && (
            <Html position={[0, 1.5, 0]} center zIndexRange={[1, 0]} wrapperClass="canvas-body-object">
              <p>{props.displayName}</p>
            </Html>
          )}
        </mesh>
      </object3D>
    </>
  );
};

export default Body;
