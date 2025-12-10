import { deepMap } from '@nanostores/deepmap'
import { uuid } from '@Utils/index'

type dialogBaseProps = {
  id?: string;
  isOpen?: boolean;
}

type dialogStatesProps = {
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  bgColor?: string;

  modalClassName?: string;
  modalStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
}

type dialogShowProps = {
  title?: string;
  description?: string;

  variant?: 'info' | 'warning' | 'error' | 'success';
  customIcon?: React.ReactNode;

  cancelAction?: () => Promise<void> | void;
  cancelActionLabel?: string;

  PrimaryAction?: () => Promise<void> | void;
  PrimaryActionLabel?: string;
  isPrimaryActionDisabled?: boolean;

  SecondaryAction?: () => Promise<void> | void;
  SecondaryActionLabel?: string;
  isSecondaryActionDisabled?: boolean;
}

type dialogCustomProps = {
  custom?: React.ReactNode
}

export type dialogAllProps = {

} & dialogBaseProps & dialogShowProps & dialogCustomProps & dialogStatesProps

const DIALOG_EXIT_DURATION_MS = 300;

export const $dialoger = deepMap<dialogAllProps[]>([])

function createDialog(props: dialogAllProps): string {
  const id = props?.id || uuid(6, 'lifo:dialog:');
  const dialogs = $dialoger.get()

  $dialoger.setKey(`[${dialogs.length}]`, {
    ...props,
    id,
  })
  return id
}

function show(props: dialogShowProps & dialogStatesProps & { id?: string }): string {
  return createDialog({ ...props, isOpen: true })
}

function hide(id: string) {
  let dialogs = $dialoger.get() || []
  let currentIndex = dialogs.findIndex(item => item.id === id)

  if (currentIndex === -1) {
    console.warn(`Dialog with id "${id}" not found.`);
    return;
  }

  $dialoger.updateKey(`[${currentIndex}].isOpen`, false);

  setTimeout(() => {
    destroy(id);
  }, DIALOG_EXIT_DURATION_MS);
}

function custom(children: React.ReactNode, props?: Omit<dialogBaseProps, 'isOpen'> & dialogStatesProps): string {
  return createDialog({
    ...props,
    custom: children,
    isOpen: true
  })
}

function destroy(id: string) {
  const dialogs = $dialoger.get() || [];
  const newDialogs = dialogs.filter(item => item.id !== id);
  $dialoger.set(newDialogs);
}


export const dialog = {
  show,
  hide,
  destroy,
  custom
}
