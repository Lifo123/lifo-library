import { deepMap } from "@nanostores/deepmap";

export const $sheet = deepMap<Record<string, boolean>>({});

function render(id: string, state: boolean) {
  if (!id) {
    console.error("Sheet: id is required");
  }

  $sheet.updateKey(id, state);
}

function hide(id?: string) {
  const record = $sheet.get();
  if (!id) {
    Object.keys(record).forEach((key) => {
      $sheet.updateKey(key, false);
    });
    return;
  }

  $sheet.updateKey(id, false);
}

export const sheet = {
  show: (id: string) => render(id, true),
  hide,
  toggle: (id: string) => render(id, !$sheet.get()[id]),
};
