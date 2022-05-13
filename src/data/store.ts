import { Store } from "pullstate";

type AppSettings = {
  showingStartupModal: boolean;
  paused: boolean;
  focusingBody: boolean; // whether or not a focus transition is occurring.
};

type UserSettings = {
  showLabels: boolean;
  showOrbitPaths: boolean;
  showWireframes: boolean;
  showDebugInfo: boolean;
  enableMusic: boolean;
  enableGodRays: boolean;
  timeSpeedModifier: number; // range [0-1].
  focusedBody: string; // body display name.
};

type StoreProps = {
  appSettings: AppSettings;
  userSettings: UserSettings;
};

const DEFAULT_APP_SETTINGS: AppSettings = {
  showingStartupModal: true,
  paused: false,
  focusingBody: false,
} as const;

const DEFAULT_USER_SETTINGS: UserSettings = {
  showLabels: true,
  showOrbitPaths: true,
  showWireframes: false,
  showDebugInfo: false,
  enableMusic: true,
  enableGodRays: true,
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
    showWireframes: loadUserSetting("showWireframes", DEFAULT_USER_SETTINGS.showWireframes),
    showDebugInfo: loadUserSetting("showDebugInfo", DEFAULT_USER_SETTINGS.showDebugInfo),
    enableMusic: loadUserSetting("enableMusic", DEFAULT_USER_SETTINGS.enableMusic),
    enableGodRays: loadUserSetting("enableGodRays", DEFAULT_USER_SETTINGS.enableGodRays),
    timeSpeedModifier: loadUserSetting("timeSpeedModifier", DEFAULT_USER_SETTINGS.timeSpeedModifier),
    focusedBody: loadUserSetting("focusedBody", DEFAULT_USER_SETTINGS.focusedBody),
  },
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
  (s) => s.userSettings.showWireframes,
  (value) => saveUserSetting("showWireframes", value)
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
  (s) => s.userSettings.enableGodRays,
  (value) => saveUserSetting("enableGodRays", value)
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

export const resetUserSettings = () => {
  store.update((s) => {
    s.appSettings.focusingBody = true;
    s.userSettings = DEFAULT_USER_SETTINGS;
  });
};

export default store;
