import { Anchor, Button, Center, Modal, Stack, Text } from "@mantine/core";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Scene from "../components/Scene";
import SettingsPanel from "../components/SettingsPanel";

const Home = () => {
  const [startupModalOpened, setStartupModalOpened] = useState(true);
  const closeModal = () => setStartupModalOpened(false);

  return (
    <>
      <Canvas shadows>
        <Scene />
      </Canvas>
      <SettingsPanel />
      <Modal
        centered
        size="sm"
        zIndex={2}
        opened={startupModalOpened}
        withCloseButton={false}
        overlayOpacity={0.5}
        overlayBlur={1.5}
        onClose={closeModal}
      >
        <Stack align="center" spacing="xs">
          <Text size="xl" weight="bold">
            React Solar System
          </Text>
          <Text>
            by{" "}
            <Anchor href="https://github.com/nbetts" target="_blank">
              Nathan Betts
            </Anchor>
          </Text>
          <Text align="center" my="lg">
            A model solar system built with React, React Three Fiber and Three.js.
          </Text>
          <Button data-autofocus onClick={closeModal}>
            Jump in!
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default Home;
