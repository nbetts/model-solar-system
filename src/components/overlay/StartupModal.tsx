import { Anchor, Button, Image, Modal, Stack, Text } from "@mantine/core";
import store, { updateAppSetting } from "src/data/store";
// import faviconUrl from "src/assets/favicon.svg";

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
        <Image width={100} height={100} src="/assets/favicon.svg" alt="Model Solar System logo" />
        <Text size="xl" weight="bold">
          Model Solar System
        </Text>
        <Text>
          by{" "}
          <Anchor href="https://github.com/nbetts" target="_blank">
            Nathan Betts
          </Anchor>
        </Text>
        <Text align="center" my="lg">
          A model solar system built with Three.js, React and React Three Fiber.
        </Text>
        <Button data-autofocus onClick={closeModal}>
          Jump in!
        </Button>
      </Stack>
    </Modal>
  );
};

export default StartupModal;
