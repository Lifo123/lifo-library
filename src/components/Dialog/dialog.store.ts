import { deepMap } from "@nanostores/deepmap";

export const $dialog = deepMap<Record<string, boolean>>({});

function render(id: string & {}, state: boolean) {
  if (!id) throw new Error("Dialog: id is required");
  $dialog.updateKey(id, state);
}

function hide(id?: string & {}) {
  const record = $dialog.get();
  if (!id) {
    Object.keys(record).forEach((key) => {
      $dialog.updateKey(key, false);
    });
    return;
  }

  $dialog.updateKey(id, false);
}

export const dialog = {
  show: (id: string & {}) => render(id, true),
  hide,
  toggle: (id: string & {}) => render(id, !$dialog.get()[id as string]),
};
