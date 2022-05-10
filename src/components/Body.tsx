import { Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { BodyType } from "../data/bodies";
import store from "../data/store";
import { useShowLabels, useShowOrbitPaths, useShowWireframes } from "../hooks/settings";

type BodyProps = {
  timeStepRef: MutableRefObject<number>;
  controlsRef: MutableRefObject<OrbitControlsImpl>;
  focused?: boolean;
} & BodyType;

const Body = (props: BodyProps) => {
  const [showLabels] = useShowLabels();
  const [showOrbitPaths] = useShowOrbitPaths();
  const [showWireframes] = useShowWireframes();

  const ref = useRef<Mesh>(null!);
  const [orbitPathPoints, setOrbitPathPoints] = useState<Vector3[]>([]);

  /**
   * Initialize scale, position and orbit paths.
   */
  useEffect(() => {
    const scale = props.diameter * 0.0000001;
    ref.current.scale.x = scale;
    ref.current.scale.y = scale;
    ref.current.scale.z = scale;
    ref.current.position.x = props.distanceFromSun;

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
    const { paused } = store.getRawState();

    if (!paused) {
      const timeStep = props.timeStepRef.current;
      const orbitalPeriodStep = (1 / props.orbitalPeriod) * timeStep;
      const rotationPeriodStep = props.rotationPeriod * timeStep;

      if (props.distanceFromSun) {
        ref.current.position.x = props.distanceFromSun * Math.sin(orbitalPeriodStep);
        ref.current.position.z = props.distanceFromSun * Math.cos(orbitalPeriodStep);
      }

      ref.current.rotation.y = rotationPeriodStep;
    }

    if (props.focused) {
      props.controlsRef.current.target = props.controlsRef.current.target.lerp(ref.current.position, 0.1);
    }
  });

  const scale = ref.current?.scale.x || 0;

  return (
    <>
      {showOrbitPaths && orbitPathPoints.length > 0 && <Line points={orbitPathPoints} color={props.orbitColor} />}
      <mesh ref={ref}>
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
          <Html
            position={[0, 2, 0]}
            center
            zIndexRange={[1, 0]}
            wrapperClass="canvas-body-object"
            distanceFactor={1}
            style={{ fontSize: scale * 1000, top: -(scale * 75) }}
          >
            <p>{props.displayName}</p>
          </Html>
        )}
      </mesh>
    </>
  );
};

export default Body;
