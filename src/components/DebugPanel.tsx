import { Card, Text } from "@mantine/core";
import store from "../data/store";

const DebugPanel = () => {
  const cameraDistance = store.useState((s) => s.appSettings.cameraDistance);
  const distance = (cameraDistance * 1000000).toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <Card p="xs" style={{ position: "absolute", top: "5px", left: "85px", zIndex: 2 }}>
      <Text size="sm">{distance} km</Text>
    </Card>
  );
};

export default DebugPanel;
