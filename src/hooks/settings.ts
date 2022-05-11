import { useLocalStorage } from "@mantine/hooks";
import store, { triggerFocusingBodyTransition } from "../data/store";

export const useShowLabels = () => useLocalStorage({ key: "showLabels", defaultValue: true });
export const useShowOrbitPaths = () => useLocalStorage({ key: "showOrbitPaths", defaultValue: true });
export const usePlayMusic = () => useLocalStorage({ key: "playMusic", defaultValue: true });
export const useShowGodRays = () => useLocalStorage({ key: "showGodRays", defaultValue: true });
export const useShowWireframes = () => useLocalStorage({ key: "showWireframes", defaultValue: false });
export const useShowDebugInfo = () => useLocalStorage({ key: "showDebugInfo", defaultValue: false });
export const useTimeSpeedModifier = () => useLocalStorage({ key: "timeSpeedModifier", defaultValue: 50 });

export const useFocusedBody = (): [string, (data: string) => void] => {
  const [focusedBody, setFocusedBody] = useLocalStorage({ key: "focusedBody", defaultValue: "Mars" });

  const setFocusedBodyOverride = (displayName: string) => {
    triggerFocusingBodyTransition();
    setFocusedBody(displayName);
  };

  return [focusedBody, setFocusedBodyOverride];
};
