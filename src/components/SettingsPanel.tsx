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
          color="cyan"
          checked={paused}
          onChange={(event) => setPaused(event.currentTarget.checked)}
        />
        <Checkbox
          label="Show labels"
          color="cyan"
          checked={showLabels}
          onChange={(event) => setShowLabels(event.currentTarget.checked)}
        />
        <Checkbox
          label="Show orbits"
          color="cyan"
          checked={showOrbitPaths}
          onChange={(event) => setShowOrbitPaths(event.currentTarget.checked)}
        />
        <Checkbox
          label="Show wireframes"
          color="cyan"
          checked={showWireframes}
          onChange={(event) => setShowWireframes(event.currentTarget.checked)}
        />
        <Checkbox
          label="Show debug info"
          color="cyan"
          checked={showDebugInfo}
          onChange={(event) => setShowDebugInfo(event.currentTarget.checked)}
        />
        <hr />
        <RadioGroup
          orientation="vertical"
          label="Focused body"
          spacing="xs"
          color="cyan"
          size="sm"
          value={focusedBody}
          onChange={setFocusedBody}
        >
          {bodies.map(({ displayName }) => (
            <Radio key={displayName} value={displayName} label={displayName} />
          ))}
        </RadioGroup>
        <hr />
        <Text>Simulation speed</Text>
        <Slider value={timeSpeedModifier} onChange={setTimeSpeedModifier} min={1} max={750} />
        <hr />
        <Button variant="outline" color="cyan" onClick={resetSettings}>
          Reset settings
        </Button>
      </Stack>
    </Card>
  );
};

export default SettingsPanel;
