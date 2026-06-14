import { deepMap } from "@nanostores/deepmap";

type LoadingStore = {
  state: boolean;
  message?: string;
};

export const _loading = deepMap<Record<string, LoadingStore>>({
  all: {
    state: false,
  },
});

function start(key: string, message?: string) {
  _loading.setKey(key, { state: true, message });
}

function stop(key: string) {
  _loading.updateKey(`${key}.state`, false);
}

async function promise(
  promise: () => Promise<void>,
  key: string,
  message?: string,
) {
  try {
    start(key, message);
    await promise();
  } catch (e) {
    console.error(e);
    stop(key);
  } finally {
    stop(key);
  }
}

export const loading = {
  start,
  stop,
  promise,
};
