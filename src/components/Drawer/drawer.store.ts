import { deepMap } from "@nanostores/deepmap";

export const $drawer = deepMap<Record<string, boolean>>({});

function render(id: string & {}, state: boolean) {
  if (!id) {
    console.error("Sheet: id is required");
  }

  $drawer.updateKey(id, state);
}

function hide(id?: string & {}) {
  const record = $drawer.get();
  if (!id) {
    Object.keys(record).forEach((key) => {
      $drawer.updateKey(key, false);
    });
    return;
  }

  $drawer.updateKey(id, false);
}

export const drawer = {
  show: (id: string & {}) => render(id, true),
  hide,
  toggle: (id: string & {}) => render(id, !$drawer.get()[id as string]),
};
