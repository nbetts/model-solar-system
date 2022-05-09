import { Store } from "pullstate";

type StoreProps = {
  time: number; // track the total time elapsed.
  settings: {
    focusedBody: string;
    paused: boolean;
    showLabels: boolean;
    showOrbitPaths: boolean;
    showWireframes: boolean;
    showDebugInfo: boolean;
    timeSpeedModifier: number; // value between 1-750.
  };
};

const store = new Store<StoreProps>({
  time: 0,
  settings: {
    focusedBody: "Sun",
    paused: false,
    showLabels: true,
    showOrbitPaths: true,
    showWireframes: true,
    showDebugInfo: true,
    timeSpeedModifier: 250,
  },
});

export default store;
