import { bodies } from "../data/bodies";
import store from "../data/store";

const SettingsPanel = () => {
  const paused = store.useState((s) => s.settings.paused);
  const focusedBody = store.useState((s) => s.settings.focusedBody);
  const showLabels = store.useState((s) => s.settings.showLabels);
  const showOrbitPaths = store.useState((s) => s.settings.showOrbitPaths);
  const showWireframes = store.useState((s) => s.settings.showWireframes);
  const showDebugInfo = store.useState((s) => s.settings.showDebugInfo);
  const timeSpeedModifier = store.useState((s) => s.settings.timeSpeedModifier);

  return (
    <div className="settings-container">
      <span className="settings-header">Settings</span>
      <div className="setting-container">
        <input
          id="time-speed-modifier-input"
          type="range"
          min={1}
          max={750}
          value={timeSpeedModifier}
          onChange={(event) => {
            store.update((s) => {
              s.settings.timeSpeedModifier = parseInt(event.target.value);
            });
          }}
        />
        <label htmlFor="time-speed-modifier-input">Speed</label>
      </div>
      <div className="setting-container">
        <input
          id="paused-input"
          type="checkbox"
          checked={paused}
          onChange={() => {
            store.update((s) => {
              s.settings.paused = !paused;
            });
          }}
        />
        <label htmlFor="paused-input">Paused</label>
      </div>
      <hr />
      <div className="setting-container">
        <input
          id="show-labels-input"
          type="checkbox"
          checked={showLabels}
          onChange={() => {
            store.update((s) => {
              s.settings.showLabels = !showLabels;
            });
          }}
        />
        <label htmlFor="show-labels-input">Show labels</label>
      </div>
      <div className="setting-container">
        <input
          id="show-orbit-paths-input"
          type="checkbox"
          checked={showOrbitPaths}
          onChange={() => {
            store.update((s) => {
              s.settings.showOrbitPaths = !showOrbitPaths;
            });
          }}
        />
        <label htmlFor="show-orbit-paths-input">Show orbits</label>
      </div>
      <div className="setting-container">
        <input
          id="show-wireframes-input"
          type="checkbox"
          checked={showWireframes}
          onChange={() => {
            store.update((s) => {
              s.settings.showWireframes = !showWireframes;
            });
          }}
        />
        <label htmlFor="show-wireframes-input">Show wireframes</label>
      </div>
      <div className="setting-container">
        <input
          id="show-debug-info-input"
          type="checkbox"
          checked={showDebugInfo}
          onChange={() => {
            store.update((s) => {
              s.settings.showDebugInfo = !showDebugInfo;
            });
          }}
        />
        <label htmlFor="show-debug-info-input">Show debug info</label>
      </div>
      <hr />
      <fieldset>
        <legend>Focused body</legend>
        {bodies.map((body) => (
          <>
            <div className="setting-container">
              <input
                type="radio"
                id={body.displayName}
                name="body"
                checked={body.displayName === focusedBody}
                onChange={() => {
                  store.update((s) => {
                    s.settings.focusedBody = body.displayName;
                  });
                }}
              />
              <label htmlFor={body.displayName}>{body.displayName}</label>
            </div>
          </>
        ))}
      </fieldset>
    </div>
  );
};

export default SettingsPanel;
