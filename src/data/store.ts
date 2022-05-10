import { Store } from "pullstate";

type StoreProps = {
  paused: boolean; // whether or not the solar system is paused.
  time: number; // track the total time elapsed.
};

const store = new Store<StoreProps>({
  paused: false,
  time: 0,
});

export default store;
