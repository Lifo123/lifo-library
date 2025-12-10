'use client'
import { deepMap } from "@nanostores/deepmap";
import uuid from "@Utils/uuid";
import { atom } from 'nanostores';

type LoadingStore = {
  [key: string]: boolean;
}

const $loading = deepMap<LoadingStore>({
  global: false,
})

const currentLoading = atom<string>('');

function set(value: boolean, id?: string): string {
  const idSafe = id || uuid();

  $loading.updateKey(idSafe, value);
  currentLoading.set(idSafe);
  return idSafe;
}

async function promise(fn: () => Promise<void>, id?: string) {
  const idSafe = set(true, id);

  try {
    await fn();
  } catch (error) {
    throw error;
  } finally {
    $loading.setKey(idSafe, false);
  }
};

function off(id?: string) {
  if (id) {
    $loading.setKey(id, false);
  };

  const keys = $loading.get();
  Object.keys(keys).forEach(key => {
    if (key !== id) {
      $loading.setKey(key, false);
    }
  });
}


export const loading = {
  start: (id?: string) => set(true, id),
  promise,
  off,
  store: $loading,
  current: currentLoading,
}
