import { Stats } from "@react-three/drei";
import store from "src/data/store";

const DebugInfo = () => {
  const showDebugInfo = store.useState((s) => s.userSettings.showDebugInfo);
  return showDebugInfo ? <Stats /> : null;
};

export default DebugInfo;
