import { Html, Line, LineProps, useTexture } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Vector3 } from "three/src/math/Vector3";
import { Mesh } from "three/src/objects/Mesh";
import { BodyType } from "src/data/bodies";
import store, { updateAppSetting, updateRefSetting, updateUserSetting } from "src/data/store";
import { PointLight } from "three/src/lights/PointLight";
import { Object3D } from "three/src/core/Object3D";

const TWO_PI = Math.PI * 2;

type BodyProps = {
  index: number;
  bodyRef: RefObject<Mesh>;
  timeStepRef: MutableRefObject<number>;
  cameraRef: MutableRefObject<PerspectiveCameraProps>;
  controlsRef: MutableRefObject<OrbitControlsImpl>;
} & BodyType;

const Body = (props: BodyProps) => {
  const showLabels = store.useState((s) => s.userSettings.showLabels);
  const showOrbitPaths = store.useState((s) => s.userSettings.showOrbitPaths);
  const showWireframes = store.useState((s) => s.userSettings.showWireframes);
  const actualScale = store.useState((s) => s.userSettings.actualScale);
  const isSun = props.index === 0;

  const { bodyRef } = props;
  const pointLightRef = useRef<PointLight>(null);
  const orbitPathRef = useRef<LineProps>(null!);
  const labelRef = useRef<Object3D>(null);
  const distanceFromSunRef = useRef<number>(0);
  const texture = useTexture(props.textureSrc);
  const [orbitPathPoints, setOrbitPathPoints] = useState<Vector3[]>([]);

  const focusBody = () => {
    if (store.getRawState().userSettings.focusedBody !== props.displayName) {
      updateUserSetting("focusedBody", props.displayName);
      updateAppSetting("focusingBody", true);
    }
  };

  /**
   * Initialize shadows.
   */
  useEffect(() => {
    if (pointLightRef.current) {
      // todo: make shadows smooth, they currently look pixelated
      pointLightRef.current.shadow.camera.far = 6000;

      updateRefSetting("lightRef", pointLightRef);
    }
  }, [bodyRef.current]);

  /**
   * Initialize scale, position and orbit paths.
   */
  useEffect(() => {
    if (!bodyRef.current) {
      return;
    }

    let distanceFromSun = props.distanceFromSun;
    let scale = props.diameter * 0.0000001;

    if (!actualScale) {
      distanceFromSun = props.displayName === "Sun" ? 0 : 400 + Math.pow(props.index + 3, 2) * 20;
      scale = props.displayName === "Sun" ? props.diameter * 0.0001 : props.diameter * 0.0005;
    }

    bodyRef.current.scale.x = scale;
    bodyRef.current.scale.y = scale;
    bodyRef.current.scale.z = scale;
    bodyRef.current.position.x = distanceFromSun;

    const points = new Array(200);

    for (let i = 0; i < points.length; i++) {
      const step = (i / (points.length - 1)) * TWO_PI;
      const x = distanceFromSun * Math.sin(step);
      const z = distanceFromSun * Math.cos(step);
      points[i] = [x, 0, z];
    }

    distanceFromSunRef.current = distanceFromSun;
    setOrbitPathPoints(points);
  }, [bodyRef.current, actualScale, props.index, props.diameter, props.distanceFromSun]);

  useFrame(() => {
    if (!bodyRef.current) {
      return;
    }

    const { appSettings, userSettings } = store.getRawState();

    const oldBodyPosition = new Vector3();
    bodyRef.current.getWorldPosition(oldBodyPosition);

    if (userSettings.timeSpeedModifier > 0) {
      const timeStep = props.timeStepRef.current;
      const orbitalPeriodStep = props.orbitalPeriod * TWO_PI * timeStep;
      const rotationPeriodStep = props.rotationPeriod * TWO_PI * timeStep; // 24 hours in a day

      if (distanceFromSunRef.current) {
        bodyRef.current.position.x = distanceFromSunRef.current * Math.sin(orbitalPeriodStep);
        bodyRef.current.position.z = distanceFromSunRef.current * Math.cos(orbitalPeriodStep);

        const labelPosition = labelRef.current?.position;

        if (labelPosition) {
          labelPosition.x = oldBodyPosition.x;
          labelPosition.y = bodyRef.current.scale.y * 1.5;
          labelPosition.z = oldBodyPosition.z;
        }
      }

      bodyRef.current.rotation.x = props.axialTilt;
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
        cameraPosition.x = bodyPosition.x - bodyRef.current.scale.x * 4;
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
      <object3D rotation={[actualScale ? props.orbitalInclination : 0, 0, 0]}>
        {showOrbitPaths && orbitPathPoints.length > 0 && (
          <Line
            ref={orbitPathRef as any}
            points={orbitPathPoints}
            color={props.orbitColor}
            transparent
            // opacity={0.5}
          />
        )}
        <mesh ref={bodyRef} castShadow={!isSun} receiveShadow={!isSun} onClick={focusBody}>
          {isSun && bodyRef.current && (
            <>
              <ambientLight color={props.color} intensity={0.02} />
              <pointLight ref={pointLightRef} color={props.color} intensity={3} decay={2} castShadow />
            </>
          )}
          <sphereGeometry args={[1, 64, 32]} />
          <meshPhongMaterial
            wireframe={showWireframes}
            map={texture}
            emissive={isSun ? props.color : 0x000000}
            shininess={props.albedo}
          />
        </mesh>
        {showLabels && (
          <object3D ref={labelRef}>
            <Html position={[0, 1, 0]} center zIndexRange={[1, 0]} wrapperClass="canvas-body-object">
              <p onClick={focusBody}>{props.displayName}</p>
            </Html>
          </object3D>
        )}
      </object3D>
    </>
  );
};

export default Body;
