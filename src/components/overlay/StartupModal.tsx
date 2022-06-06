import { Anchor, Button, Image, Modal, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import store, { updateAppSetting } from "src/data/store";

type StartupModalProps = {
  loading: boolean;
};

const StartupModal = ({ loading }: StartupModalProps) => {
  const showingStartupModal = store.useState((s) => s.appSettings.showingStartupModal);
  const buttonRef = useRef<HTMLButtonElement>(null!);

  const closeModal = () => {
    updateAppSetting("showingStartupModal", false);
    updateAppSetting("focusingBody", true);
  };

  useEffect(() => {
    if (!loading) {
      buttonRef.current.focus();
    }
  }, [loading]);

  return (
    <Modal
      centered
      size="sm"
      zIndex={Number.MAX_SAFE_INTEGER}
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
        <Button ref={buttonRef} data-autofocus onClick={closeModal} loading={loading}>
          {loading ? "Loading" : "Jump in!"}
        </Button>
      </Stack>
    </Modal>
  );
};

export default StartupModal;
