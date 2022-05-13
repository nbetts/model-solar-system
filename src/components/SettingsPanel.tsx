import { Button, Card, Checkbox, Radio, RadioGroup, Slider, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import useSound from "use-sound";
import { bodies } from "../data/bodies";
import store, { resetSettings, updateAppSetting, updateUserSetting } from "../data/store";

// "Ambient Relaxing music for You" by Amurich, on https://pixabay.com
const musicFile =
  "https://cdn.pixabay.com/download/audio/2022/01/30/audio_874db07cfd.mp3?filename=ambient-relaxing-music-for-you-15969.mp3";

const SettingsPanel = () => {
  const paused = store.useState((s) => s.appSettings.paused);
  const userSettings = store.useState((s) => s.userSettings);

  const [, { duration, sound }] = useSound(musicFile, { volume: 0.25, autoplay: userSettings.enableMusic });

  useEffect(() => {
    if (duration) {
      if (userSettings.enableMusic) {
        sound.fade(0, 1, 300);
      } else {
        sound.fade(1, 0, 300);
      }
    }
  }, [duration, userSettings.enableMusic]);

  return (
    <Card style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2 }}>
      <Stack spacing="xs">
        <Text size="xl" weight="bold">
          Settings
        </Text>
        <Checkbox
          label="Paused"
          checked={paused}
          onChange={(event) => updateAppSetting("paused", event.currentTarget.checked)}
        />
        <Checkbox
          label="Labels"
          checked={userSettings.showLabels}
          onChange={(event) => updateUserSetting("showLabels", event.currentTarget.checked)}
        />
        <Checkbox
          label="Orbits"
          checked={userSettings.showOrbitPaths}
          onChange={(event) => updateUserSetting("showOrbitPaths", event.currentTarget.checked)}
        />
        <Checkbox
          label="Wireframes"
          checked={userSettings.showWireframes}
          onChange={(event) => updateUserSetting("showWireframes", event.currentTarget.checked)}
        />
        <Checkbox
          label="Debug info"
          checked={userSettings.showDebugInfo}
          onChange={(event) => updateUserSetting("showDebugInfo", event.currentTarget.checked)}
        />
        <Checkbox
          label="Music"
          checked={userSettings.enableMusic}
          onChange={(event) => updateUserSetting("enableMusic", event.currentTarget.checked)}
        />
        <Checkbox
          label="God rays"
          checked={userSettings.enableGodRays}
          onChange={(event) => updateUserSetting("enableGodRays", event.currentTarget.checked)}
        />
        <hr />
        <RadioGroup orientation="vertical" label="Focused body" spacing="xs" size="sm" value={userSettings.focusedBody}>
          {bodies.map(({ displayName }) => (
            <Radio
              key={displayName}
              value={displayName}
              label={displayName}
              onClick={() => {
                updateAppSetting("focusingBody", true);
                updateUserSetting("focusedBody", displayName);
              }}
            />
          ))}
        </RadioGroup>
        <hr />
        <Text size="sm">Simulation speed</Text>
        <Slider
          value={userSettings.timeSpeedModifier * 1000}
          onChange={(value) => updateUserSetting("timeSpeedModifier", value / 1000)}
          min={1}
          max={1000}
        />
        <hr />
        <Button variant="outline" color="gray" onClick={resetSettings}>
          Reset settings
        </Button>
      </Stack>
    </Card>
  );
};

export default SettingsPanel;
