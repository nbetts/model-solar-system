import { Stars } from "@react-three/drei";

type SpaceBackgrounsProps = {
  distance: number;
  starTwinkle: number;
};

const SpaceBackground = ({ distance, starTwinkle }: SpaceBackgrounsProps) => {
  return <Stars radius={distance * 0.2} depth={distance} count={20000} factor={distance * starTwinkle} />;
};

export default SpaceBackground;
