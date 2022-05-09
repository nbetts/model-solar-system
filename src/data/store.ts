import { Store } from "pullstate";

type StoreProps = {
  time: number; // track the total time elapsed.
};

const store = new Store<StoreProps>({
  time: 0,
});

export default store;
