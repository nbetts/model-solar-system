import {
  Accordion,
  Anchor,
  Button,
  Card,
  Checkbox,
  createStyles,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { useEffect } from "react";
import GitHubButton from "react-github-btn";
import useSound from "use-sound";
import { bodies } from "src/data/bodies";
import store, { resetUserSettings, updateAppSetting, updateUserSetting } from "src/data/store";

// "Ambient Relaxing music for You" by Amurich, on https://pixabay.com
const musicFile =
  "https://cdn.pixabay.com/download/audio/2022/01/30/audio_874db07cfd.mp3?filename=ambient-relaxing-music-for-you-15969.mp3";

const useStyles = createStyles(() => ({
  content: {
    paddingLeft: 0,
  },
}));

const SettingsPanel = () => {
  const userSettings = store.useState((s) => s.userSettings);
  const { fullscreen, toggle: toggleFullscreen } = useFullscreen();
  const { classes } = useStyles();

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
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        width: "180px",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <Card p={0} m={6}>
        <Accordion multiple initialItem={0} iconPosition="right" classNames={classes}>
          <Accordion.Item label="Settings">
            <Stack spacing="xs" py="xs">
              <Checkbox label="Fullscreen" checked={fullscreen} onChange={toggleFullscreen} />
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
                label="Music"
                checked={userSettings.enableMusic}
                onChange={(event) => updateUserSetting("enableMusic", event.currentTarget.checked)}
              />
              <Checkbox
                label="Effects"
                checked={userSettings.enableEffects}
                onChange={(event) => updateUserSetting("enableEffects", event.currentTarget.checked)}
              />
              <Checkbox
                label="Actual scale"
                checked={userSettings.actualScale}
                onChange={(event) => updateUserSetting("actualScale", event.currentTarget.checked)}
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
              <hr />
              <Text size="sm">Simulation speed</Text>
              <Slider
                value={userSettings.timeSpeedModifier * 1000}
                onChange={(value) => updateUserSetting("timeSpeedModifier", value / 1000)}
                min={0}
                max={1000}
              />
              <hr />
              <RadioGroup
                orientation="vertical"
                label="Focused body"
                spacing="xs"
                size="sm"
                value={userSettings.focusedBody}
              >
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
              <Button variant="outline" color="gray" onClick={resetUserSettings}>
                Reset settings
              </Button>
            </Stack>
          </Accordion.Item>
          <Accordion.Item label="Help">
            <Stack spacing="xs" py={0}>
              <Text size="sm">The quick brown fox jumps over the lazy dog.</Text>
            </Stack>
          </Accordion.Item>
          <Accordion.Item label="About">
            <Stack spacing="xs" py={0}>
              <Text size="sm">A model solar system built with Three.js, React and React Three Fiber.</Text>
              <Text size="sm" mb="xs">
                by{" "}
                <Anchor size="sm" href="https://github.com/nbetts" target="_blank">
                  Nathan Betts
                </Anchor>
                .
              </Text>
              {/* @ts-ignore */}
              <GitHubButton
                href="https://github.com/nbetts/react-solar-system"
                data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                data-size="large"
                data-show-count="true"
                aria-label="Star nbetts/react-solar-system on GitHub"
              >
                Star
              </GitHubButton>
            </Stack>
          </Accordion.Item>
        </Accordion>
      </Card>
    </div>
  );
};

export default SettingsPanel;
