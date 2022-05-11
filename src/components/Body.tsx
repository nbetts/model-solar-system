import { Html, Line, LineProps } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { lerp } from "three/src/math/MathUtils";
import { BodyType } from "../data/bodies";
import store from "../data/store";
import { useFocusedBody, useShowLabels, useShowOrbitPaths, useShowWireframes } from "../hooks/settings";

type BodyProps = {
  timeStepRef: MutableRefObject<number>;
  cameraRef: MutableRefObject<PerspectiveCameraProps>;
  controlsRef: MutableRefObject<OrbitControlsImpl>;
} & BodyType;

const Body = (props: BodyProps) => {
  const [showLabels] = useShowLabels();
  const [showOrbitPaths] = useShowOrbitPaths();
  const [showWireframes] = useShowWireframes();
  const [focusedBody] = useFocusedBody();
  const focused = focusedBody === props.displayName;

  const bodyRef = useRef<Mesh>(null!);
  const orbitPathRef = useRef<LineProps>(null!);
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
    const { paused, focusingBody } = store.getRawState();

    if (!paused) {
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

    if (focused && focusingBody) {
      // props.controlsRef.current.target = props.controlsRef.current.target.lerp(ref.current.position, 0.9);
      const bodyPosition = new Vector3();
      bodyRef.current.getWorldPosition(bodyPosition);
      props.controlsRef.current.target = bodyPosition;

      const position = props.cameraRef.current.position as Vector3;
      position.x = lerp(position.x, bodyPosition.x + bodyRef.current.scale.x * 6, 0.25);
      position.y = lerp(position.y, bodyPosition.y + bodyRef.current.scale.y * 1.5, 0.25);
      position.z = lerp(position.z, bodyPosition.z - bodyRef.current.scale.z * 6, 0.25);
    }
  });

  const scale = bodyRef.current?.scale.x || 0;

  return (
    <>
      <object3D rotation={[props.orbitalInclination, 0, 0]}>
        {showOrbitPaths && orbitPathPoints.length > 0 && (
          <Line ref={orbitPathRef as any} points={orbitPathPoints} color={props.orbitColor} />
        )}
        <mesh ref={bodyRef} position={[0, 0, props.distanceFromSun]}>
          {props.isLight && (
            <>
              <ambientLight color={props.color} intensity={0.01} />
              <pointLight color={props.color} intensity={25} />
            </>
          )}
          <sphereGeometry args={[1, 64, 32]} />
          <meshPhongMaterial
            wireframe={showWireframes}
            color={props.color}
            emissive={props.isLight ? props.color : 0x000}
          />
          {showLabels && (
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
