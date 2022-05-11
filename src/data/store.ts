import { Store } from "pullstate";

type StoreProps = {
  paused: boolean; // whether or not the solar system is paused.
  focusingBody: boolean; // whether or not a focus transition is occurring.
};

const store = new Store<StoreProps>({
  paused: false,
  focusingBody: false,
});

export const triggerFocusingBodyTransition = () => {
  store.update((s) => {
    s.focusingBody = true;
  });

  // Temporarily override camera position whilst focusing on body. Orbit controls aren't available during this time.
  setTimeout(() => {
    store.update((s) => {
      s.focusingBody = false;
    });
  }, 1000);
};

export default store;
