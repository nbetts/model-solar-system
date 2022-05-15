import { Card, Text } from "@mantine/core";
import store from "src/data/store";

const StatsPanel = () => {
  const actualScale = store.useState((s) => s.userSettings.actualScale);
  const showDebugInfo = store.useState((s) => s.userSettings.showDebugInfo);
  const cameraDistance = store.useState((s) => s.appSettings.cameraDistance);

  if (!actualScale) {
    return null;
  }

  const distance = (cameraDistance * 1000000).toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <Card p="xs" style={{ position: "absolute", top: "6px", left: showDebugInfo ? "85px" : "6px", zIndex: 2 }}>
      <Text size="sm">{distance} km</Text>
    </Card>
  );
};

export default StatsPanel;
