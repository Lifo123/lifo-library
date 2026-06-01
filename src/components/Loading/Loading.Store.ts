"use client";
import { deepMap } from "@nanostores/deepmap";
import { nanoid } from "nanoid";

export const $loading = deepMap<Record<string, boolean>>({
  global: false,
});

function set(value: boolean, id?: string): string {
  const idSafe = id || nanoid();

  $loading.updateKey(idSafe, value);
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
}

function end(id?: string) {
  if (id) {
    $loading.setKey(id, false);
  }

  const keys = $loading.get();
  Object.keys(keys).forEach((key) => {
    if (key !== id) {
      $loading.setKey(key, false);
    }
  });
}

export const loading = {
  start: (id: string) => set(true, id),
  promise,
  end: (id: string) => end(id),
};
