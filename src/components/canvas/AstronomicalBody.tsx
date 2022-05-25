import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AstronomicalBodyProps } from "src/data/astronomicalBodyData";
import { Html, Line, useTexture } from "@react-three/drei";
import generateOrbitPoints from "../../utils/generateOrbitPoints";
import store, { updateAppSetting, updateUserSetting } from "src/data/store";
import { Mesh } from "three/src/objects/Mesh";
import { Object3D } from "three/src/core/Object3D";
import { Vector3 } from "three/src/math/Vector3";
import { PointLight } from "three/src/lights/PointLight";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { DoubleSide } from "three/src/constants";

type Props = {
  cameraRef: MutableRefObject<PerspectiveCameraProps>;
  controlsRef: MutableRefObject<OrbitControlsImpl>;
} & AstronomicalBodyProps;

const AstronomicalBody = ({ cameraRef, controlsRef, ...props }: Props) => {
  const showLabels = store.useState((s) => s.userSettings.showLabels);
  const showDebugInfo = store.useState((s) => s.userSettings.showDebugInfo);
  const showOrbitPaths = store.useState((s) => s.userSettings.showOrbitPaths);
  const actualScale = store.useState((s) => s.userSettings.actualScale);
  const [orbitPathPoints] = useState(generateOrbitPoints(props.orbit.radius));

  const bodyOrbitRef = useRef<Object3D>(null!);
  const bodyPositionRef = useRef<Object3D>(null!);
  const bodyRef = useRef<Mesh>(null!);
  const pointLightRef = useRef<PointLight>(null);
  const bodyTexture = props.textureSrc ? useTexture(props.textureSrc) : null;
  const ringTexture = props.ring?.textureSrc ? useTexture(props.ring.textureSrc) : null;

  const focusBody = () => {
    if (store.getRawState().userSettings.focusedBody !== props.name) {
      updateUserSetting("focusedBody", props.name);
      updateAppSetting("focusingBody", true);
    }
  };

  // Rotate the initial body orbit positions by a random amount around the orbit circle.
  useEffect(() => {
    const randomAngleAlongOrbit = Math.floor(Math.random() * Math.PI * 2);
    bodyOrbitRef.current.rotation.y += randomAngleAlongOrbit;
    bodyPositionRef.current.rotation.y -= randomAngleAlongOrbit;

    // Rotate the moon so that the correct side is facing the Earth.
    if (props.name === "Moon") {
      bodyRef.current.rotation.y += Math.PI;
    }
  }, []);

  // useEffect(() => {
  //   let distanceFromSun = props.distanceFromSun;
  //   let scale = props.diameter * 0.0000001;

  //   if (!actualScale) {
  //     distanceFromSun =
  //       props.name === "Sun" ? 0 : 50 + Math.pow(props.index > 4 ? props.index * 2 : props.index + 3, 2) * 10;
  //     scale = props.name === "Sun" ? props.diameter * 0.00005 : props.diameter * 0.001;
  //   }

  //   bodyRef.current.scale.x = scale;
  //   bodyRef.current.scale.y = scale;
  //   bodyRef.current.scale.z = scale;
  //   bodyRef.current.position.x = distanceFromSun;
  // }, []);

  /**
   * Initialize lighting and shadows.
   */
  useEffect(() => {
    if (pointLightRef.current) {
      // todo: make shadows smooth, they currently look pixelated
      pointLightRef.current.shadow.camera.far = 100000000000;
    }
  }, [pointLightRef.current]);

  useFrame(() => {
    const { appSettings, userSettings } = store.getRawState();

    const oldBodyPosition = new Vector3();
    bodyRef.current.getWorldPosition(oldBodyPosition);

    if (userSettings.timeSpeedModifier > 0) {
      bodyOrbitRef.current.rotation.y += props.orbit.rotationPeriod * appSettings.timeStep;
      bodyPositionRef.current.rotation.y -= props.orbit.rotationPeriod * appSettings.timeStep;
      bodyRef.current.rotation.y += props.rotationPeriod * appSettings.timeStep;
    }

    if (userSettings.focusedBody === props.name) {
      const cameraPosition = cameraRef.current.position as Vector3;
      const bodyPosition = new Vector3();
      bodyRef.current.getWorldPosition(bodyPosition);
      controlsRef.current.target = bodyPosition;

      if (appSettings.focusingBody) {
        cameraPosition.x = bodyPosition.x - props.radius * 4;
        cameraPosition.y = bodyPosition.y + props.radius * 1.25;
        cameraPosition.z = bodyPosition.z + props.radius * 4;
        updateAppSetting("focusingBody", false);
      } else {
        cameraPosition.x += bodyPosition.x - oldBodyPosition.x;
        cameraPosition.y += bodyPosition.y - oldBodyPosition.y;
        cameraPosition.z += bodyPosition.z - oldBodyPosition.z;
      }
    }
  });

  return (
    <object3D rotation={[0, 0, props.orbit.inclination]}>
      <object3D ref={bodyOrbitRef}>
        {showOrbitPaths && (
          <Line
            points={orbitPathPoints}
            color={props.orbit.color}
            // transparent
            // opacity={0.5}
          />
        )}
        <object3D position={[props.orbit.radius, 0, 0]}>
          {props.isLight && (
            <pointLight ref={pointLightRef} color={props.color} intensity={2} distance={0} decay={2} castShadow />
          )}
          <object3D ref={bodyPositionRef} rotation={[0, 0, -props.orbit.inclination]}>
            {showLabels && (
              <Html position={[0, props.radius * 2, 0]} center zIndexRange={[1, 0]} wrapperClass="canvas-body-object">
                <p onClick={focusBody}>{props.name}</p>
              </Html>
            )}
            <object3D rotation={[0, 0, props.orbit.inclination + props.axialTilt]}>
              <object3D ref={bodyRef}>
                <mesh castShadow={!props.isLight} receiveShadow={!props.isLight} onClick={focusBody}>
                  <sphereGeometry args={[props.radius, 64, 32]} />
                  <meshPhongMaterial
                    color={bodyTexture ? undefined : props.color}
                    map={bodyTexture}
                    emissive={props.isLight ? props.color : 0x000000}
                    shininess={props.albedo}
                  />
                  {showDebugInfo && <axesHelper args={[props.radius * 1.6]} />}
                </mesh>
                {props.ring && (
                  <mesh
                    rotation={[Math.PI / 2, 0, 0]}
                    castShadow={!props.isLight}
                    receiveShadow={!props.isLight}
                    onClick={focusBody}
                  >
                    <ringGeometry args={[props.ring.innerRadius * 2, props.ring.outerRadius * 2, 32]} />
                    <meshPhongMaterial
                      side={DoubleSide}
                      color={ringTexture ? undefined : props.color}
                      map={ringTexture}
                    />
                  </mesh>
                )}
              </object3D>
            </object3D>
            {props.satellites.map((satellite, index) => (
              <AstronomicalBody key={index} {...satellite} cameraRef={cameraRef} controlsRef={controlsRef} />
            ))}
          </object3D>
        </object3D>
      </object3D>
    </object3D>
  );
};

export default AstronomicalBody;
