import { Environment, useTexture } from "@react-three/drei";
import { BackSide } from "three/src/constants";

const galacticTilt = 60.19; // degrees
const galacticTiltRadians = (galacticTilt * Math.PI) / 180;

const SpaceBackground = () => {
  const texture = useTexture("/assets/stars.jpeg");

  return (
    <Environment background near={1} far={100} resolution={3000}>
      <mesh scale={10} rotation={[galacticTiltRadians, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>
    </Environment>
  );
};

export default SpaceBackground;
