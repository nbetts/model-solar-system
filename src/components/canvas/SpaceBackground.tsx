import { Stars } from "@react-three/drei";

type SpaceBackgroundProps = {
  distance: number;
  starTwinkle: number;
};

const SpaceBackground = ({ distance, starTwinkle }: SpaceBackgroundProps) => {
  return <Stars radius={distance * 0.2} depth={distance} count={20000} factor={distance * starTwinkle} />;
};

export default SpaceBackground;
