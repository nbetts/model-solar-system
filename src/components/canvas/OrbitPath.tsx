import { useEffect, useRef } from "react";
import store from "src/data/store";
import generateOrbitPoints from "src/utils/generateOrbitPoints";
import { BufferGeometry } from "three/src/core/BufferGeometry";

type OrbitPathProps = {
  color: number;
  radius: number;
};

const OrbitPath = ({ color, radius }: OrbitPathProps) => {
  const showOrbitPaths = store.useState((s) => s.userSettings.showOrbitPaths);
  const orbitGeometryRef = useRef<BufferGeometry>(null!);

  useEffect(() => {
    orbitGeometryRef.current.setFromPoints(generateOrbitPoints(radius));
  }, [radius]);

  return (
    <lineLoop>
      <bufferGeometry ref={orbitGeometryRef} />
      <lineBasicMaterial visible={showOrbitPaths} color={color} />
    </lineLoop>
  );
};

export default OrbitPath;
