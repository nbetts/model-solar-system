import { GizmoHelper, GizmoViewport, Stats } from "@react-three/drei";
import store from "src/data/store";

const DebugInfo = () => {
  const showDebugInfo = store.useState((s) => s.userSettings.showDebugInfo);

  if (!showDebugInfo) {
    return null;
  }

  return (
    <>
      {/* todo: figure out why postprocessing is preventing the stats component from displaying.  */}
      <Stats />
      <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
        <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="white" />
      </GizmoHelper>
    </>
  );
};

export default DebugInfo;
