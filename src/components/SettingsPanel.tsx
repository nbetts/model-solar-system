import { Button, Card, Checkbox, Radio, RadioGroup, Slider, Stack, Text } from "@mantine/core";
import { bodies } from "../data/bodies";
import {
  useFocusedBody,
  usePaused,
  useShowDebugInfo,
  useShowLabels,
  useShowOrbitPaths,
  useShowWireframes,
  useTimeSpeedModifier,
} from "../hooks/settings";

const SettingsPanel = () => {
  const [paused, setPaused] = usePaused();
  const [showLabels, setShowLabels] = useShowLabels();
  const [showOrbitPaths, setShowOrbitPaths] = useShowOrbitPaths();
  const [showWireframes, setShowWireframes] = useShowWireframes();
  const [showDebugInfo, setShowDebugInfo] = useShowDebugInfo();
  const [focusedBody, setFocusedBody] = useFocusedBody();
  const [timeSpeedModifier, setTimeSpeedModifier] = useTimeSpeedModifier();

  const resetSettings = () => {
    setPaused(false);
    setShowLabels(true);
    setShowOrbitPaths(true);
    setShowWireframes(false);
    setShowDebugInfo(false);
    setFocusedBody("Sun");
    setTimeSpeedModifier(250);
  };

  return (
    <Card style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
      <Stack spacing="xs">
        <Text size="xl" weight="bold">
          Settings
        </Text>
        <Checkbox
          label="Paused"
          color="orange"
          checked={paused}
          onChange={(event) => setPaused(event.currentTarget.checked)}
        />
        <Checkbox
          label="Labels"
          color="orange"
          checked={showLabels}
          onChange={(event) => setShowLabels(event.currentTarget.checked)}
        />
        <Checkbox
          label="Orbits"
          color="orange"
          checked={showOrbitPaths}
          onChange={(event) => setShowOrbitPaths(event.currentTarget.checked)}
        />
        <Checkbox
          label="Wireframes"
          color="orange"
          checked={showWireframes}
          onChange={(event) => setShowWireframes(event.currentTarget.checked)}
        />
        <Checkbox
          label="Debug info"
          color="orange"
          checked={showDebugInfo}
          onChange={(event) => setShowDebugInfo(event.currentTarget.checked)}
        />
        <hr />
        <RadioGroup
          orientation="vertical"
          label="Focused body"
          spacing="xs"
          color="orange"
          size="sm"
          value={focusedBody}
          onChange={setFocusedBody}
        >
          {bodies.map(({ displayName }) => (
            <Radio key={displayName} value={displayName} label={displayName} />
          ))}
        </RadioGroup>
        <hr />
        <Text size="sm">Simulation speed</Text>
        <Slider value={timeSpeedModifier} onChange={setTimeSpeedModifier} min={1} max={750} color="orange" />
        <hr />
        <Button variant="outline" color="gray" onClick={resetSettings}>
          Reset settings
        </Button>
      </Stack>
    </Card>
  );
};

export default SettingsPanel;
