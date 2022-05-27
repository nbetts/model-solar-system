import { Vector3 } from "three/src/Three";

const TWO_PI = Math.PI * 2;

const generateOrbitPoints = (radius: number) => {
  const points = new Array<Vector3>(200);

  for (let i = 0; i < points.length; i++) {
    const step = (i / points.length) * TWO_PI;
    const x = radius * Math.cos(step);
    const z = radius * Math.sin(step);
    points[i] = new Vector3(x, 0, z);
  }

  return points;
};

export default generateOrbitPoints;
