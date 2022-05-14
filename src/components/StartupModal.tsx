import { Anchor, Button, Image, Modal, Stack, Text } from "@mantine/core";
import store, { updateAppSetting } from "../data/store";

const StartupModal = () => {
  const showingStartupModal = store.useState((s) => s.appSettings.showingStartupModal);

  const closeModal = () => {
    updateAppSetting("showingStartupModal", false);
    updateAppSetting("focusingBody", true);
  };

  return (
    <Modal
      centered
      size="sm"
      zIndex={2}
      opened={showingStartupModal}
      withCloseButton={false}
      overlayOpacity={0.5}
      overlayBlur={1.5}
      onClose={closeModal}
    >
      <Stack align="center" spacing="xs">
        <Image width={100} height={100} src="/src/assets/favicon.svg" alt="React Solar System logo" />
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
  );
};

export default StartupModal;
