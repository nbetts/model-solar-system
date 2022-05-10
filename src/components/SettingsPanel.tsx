import { Button, Card, Checkbox, Radio, RadioGroup, Slider, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import useSound from "use-sound";
import { bodies } from "../data/bodies";
import store from "../data/store";
import {
  useFocusedBody,
  usePlayMusic,
  useShowDebugInfo,
  useShowLabels,
  useShowOrbitPaths,
  useShowWireframes,
  useTimeSpeedModifier,
} from "../hooks/settings";

// "Ambient Relaxing music for You" by Amurich, on https://pixabay.com
const musicFile =
  "https://cdn.pixabay.com/download/audio/2022/01/30/audio_874db07cfd.mp3?filename=ambient-relaxing-music-for-you-15969.mp3";

const SettingsPanel = () => {
  const paused = store.useState((s) => s.paused);
  const [showLabels, setShowLabels] = useShowLabels();
  const [showOrbitPaths, setShowOrbitPaths] = useShowOrbitPaths();
  const [playMusic, setPlayMusic] = usePlayMusic();
  const [showWireframes, setShowWireframes] = useShowWireframes();
  const [showDebugInfo, setShowDebugInfo] = useShowDebugInfo();
  const [focusedBody, setFocusedBody] = useFocusedBody();
  const [timeSpeedModifier, setTimeSpeedModifier] = useTimeSpeedModifier();

  const [, { duration, sound }] = useSound(musicFile, { volume: 0.5, autoplay: playMusic });

  const resetSettings = () => {
    store.update((s) => {
      s.paused = false;
    });
    setShowLabels(true);
    setShowOrbitPaths(true);
    setPlayMusic(true);
    setShowWireframes(false);
    setShowDebugInfo(false);
    setFocusedBody("Sun");
    setTimeSpeedModifier(250);
  };

  useEffect(() => {
    if (duration) {
      if (playMusic) {
        sound.fade(0, 1, 300);
      } else {
        sound.fade(1, 0, 300);
      }
    }
  }, [duration, playMusic]);

  return (
    <Card style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2 }}>
      <Stack spacing="xs">
        <Text size="xl" weight="bold">
          Settings
        </Text>
        <Checkbox
          label="Paused"
          checked={paused}
          onChange={(event) =>
            store.update((s) => {
              s.paused = event.currentTarget.checked;
            })
          }
        />
        <Checkbox
          label="Labels"
          checked={showLabels}
          onChange={(event) => setShowLabels(event.currentTarget.checked)}
        />
        <Checkbox
          label="Orbits"
          checked={showOrbitPaths}
          onChange={(event) => setShowOrbitPaths(event.currentTarget.checked)}
        />
        <Checkbox label="Music" checked={playMusic} onChange={(event) => setPlayMusic(event.currentTarget.checked)} />
        <Checkbox
          label="Wireframes"
          checked={showWireframes}
          onChange={(event) => setShowWireframes(event.currentTarget.checked)}
        />
        <Checkbox
          label="Debug info"
          checked={showDebugInfo}
          onChange={(event) => setShowDebugInfo(event.currentTarget.checked)}
        />
        <hr />
        <RadioGroup
          orientation="vertical"
          label="Focused body"
          spacing="xs"
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
        <Slider value={timeSpeedModifier} onChange={setTimeSpeedModifier} min={1} max={750} />
        <hr />
        <Button variant="outline" color="gray" onClick={resetSettings}>
          Reset settings
        </Button>
      </Stack>
    </Card>
  );
};

export default SettingsPanel;
