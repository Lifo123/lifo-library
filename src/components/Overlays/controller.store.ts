import { deepMap } from "@nanostores/deepmap";

export const $overlays = deepMap<Record<string, boolean>>({});

function show(id: string) {
  if (!id) throw new Error("Id is required field for overlay");
  $overlays.setKey(id, true);
}

function hide(id?: string) {
  if (!id) {
    Object.keys($overlays.get()).forEach((key) => {
      $overlays.setKey(key, false);
    });
    return;
  }
  $overlays.setKey(id, false);
}

export const dialog = { show, hide };
export const drawer = { show, hide };
export const sheet = { show, hide };
