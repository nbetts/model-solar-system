import { useLocalStorage } from "@mantine/hooks";

export const useShowLabels = () => useLocalStorage({ key: "showLabels", defaultValue: true });
export const useShowOrbitPaths = () => useLocalStorage({ key: "showOrbitPaths", defaultValue: true });
export const usePlayMusic = () => useLocalStorage({ key: "playMusic", defaultValue: true });
export const useShowWireframes = () => useLocalStorage({ key: "showWireframes", defaultValue: false });
export const useShowDebugInfo = () => useLocalStorage({ key: "showDebugInfo", defaultValue: false });
export const useFocusedBody = () => useLocalStorage({ key: "focusedBody", defaultValue: "Sun" });
export const useTimeSpeedModifier = () => useLocalStorage({ key: "timeSpeedModifier", defaultValue: 250 });
