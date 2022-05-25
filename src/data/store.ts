import { Store } from "pullstate";
import { MutableRefObject, RefObject } from "react";
import { PointLight } from "three/src/lights/PointLight";
import { Mesh } from "three/src/objects/Mesh";

type AppSettings = {
  timeStepModifier: number;
  timeStep: number;
  showingStartupModal: boolean;
  focusingBody: boolean; // whether or not a focus transition is occurring.
  cameraDistance: number;
};

type UserSettings = {
  showLabels: boolean;
  showOrbitPaths: boolean;
  showDebugInfo: boolean;
  enableMusic: boolean;
  enableEffects: boolean;
  actualScale: boolean;
  timeSpeedModifier: number; // range [0-1].
  focusedBody: string; // body display name.
};

type ComponentRefs = {
  lightRef?: MutableRefObject<PointLight>;
  godRaysMeshRef?: RefObject<Mesh>;
  bodyMeshRefs?: RefObject<Mesh>[];
};

type StoreProps = {
  appSettings: AppSettings;
  userSettings: UserSettings;
  componentRefs: ComponentRefs;
};

const DEFAULT_APP_SETTINGS: AppSettings = {
  timeStepModifier: 0,
  timeStep: 0,
  showingStartupModal: true,
  focusingBody: false,
  cameraDistance: 1,
} as const;

const DEFAULT_USER_SETTINGS: UserSettings = {
  showLabels: true,
  showOrbitPaths: true,
  showDebugInfo: false,
  enableMusic: true,
  enableEffects: true,
  actualScale: false,
  timeSpeedModifier: 0.25,
  focusedBody: "Mars",
} as const;

const loadUserSetting = <T>(key: keyof UserSettings, defaultValue: T) => {
  const stringValue = localStorage.getItem(key);
  return stringValue ? (JSON.parse(stringValue) as T) : defaultValue;
};

const saveUserSetting = <T>(key: keyof UserSettings, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const store = new Store<StoreProps>({
  appSettings: DEFAULT_APP_SETTINGS,
  userSettings: {
    showLabels: loadUserSetting("showLabels", DEFAULT_USER_SETTINGS.showLabels),
    showOrbitPaths: loadUserSetting("showOrbitPaths", DEFAULT_USER_SETTINGS.showOrbitPaths),
    showDebugInfo: loadUserSetting("showDebugInfo", DEFAULT_USER_SETTINGS.showDebugInfo),
    enableMusic: loadUserSetting("enableMusic", DEFAULT_USER_SETTINGS.enableMusic),
    enableEffects: loadUserSetting("enableEffects", DEFAULT_USER_SETTINGS.enableEffects),
    actualScale: loadUserSetting("actualScale", DEFAULT_USER_SETTINGS.actualScale),
    timeSpeedModifier: loadUserSetting("timeSpeedModifier", DEFAULT_USER_SETTINGS.timeSpeedModifier),
    focusedBody: loadUserSetting("focusedBody", DEFAULT_USER_SETTINGS.focusedBody),
  },
  componentRefs: {},
});

store.subscribe(
  (s) => s.userSettings.showLabels,
  (value) => saveUserSetting("showLabels", value)
);

store.subscribe(
  (s) => s.userSettings.showOrbitPaths,
  (value) => saveUserSetting("showOrbitPaths", value)
);

store.subscribe(
  (s) => s.userSettings.showDebugInfo,
  (value) => saveUserSetting("showDebugInfo", value)
);

store.subscribe(
  (s) => s.userSettings.enableMusic,
  (value) => saveUserSetting("enableMusic", value)
);

store.subscribe(
  (s) => s.userSettings.enableEffects,
  (value) => saveUserSetting("enableEffects", value)
);

store.subscribe(
  (s) => s.userSettings.actualScale,
  (value) => saveUserSetting("actualScale", value)
);

store.subscribe(
  (s) => s.userSettings.timeSpeedModifier,
  (value) => saveUserSetting("timeSpeedModifier", value)
);

store.subscribe(
  (s) => s.userSettings.focusedBody,
  (value) => saveUserSetting("focusedBody", value)
);

export const updateAppSetting = <T>(key: keyof AppSettings, value: T) => {
  store.update((s) => {
    //@ts-ignore
    s.appSettings[key] = value;
  });
};

export const updateUserSetting = <T>(key: keyof UserSettings, value: T) => {
  store.update((s) => {
    //@ts-ignore
    s.userSettings[key] = value;
  });
};

export const updateRefSetting = <T>(key: keyof ComponentRefs, value: T) => {
  store.update((s) => {
    //@ts-ignore
    s.componentRefs[key] = value;
  });
};

export const resetUserSettings = () => {
  store.update((s) => {
    s.appSettings.focusingBody = true;
    s.userSettings = DEFAULT_USER_SETTINGS;
  });
};

export default store;
