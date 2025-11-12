import { map } from "nanostores";
import { DialogStoreProps } from "./Dialog.Types.js";
import { uuid } from "../../utils/index.js";

const DEFAULT_STATE: DialogStoreProps = {
    isOpen: false,
    isFromDialog: false,
    title: undefined,
    description: undefined,
    custom: undefined,
    variant: undefined,
    icon: undefined,
    cancelAction: undefined,
    cancelActionLabel: undefined,
    PrimaryAction: undefined,
    PrimaryActionLabel: undefined,
    isPrimaryActionDisabled: undefined,
    SecondaryAction: undefined,
    SecondaryActionLabel: undefined,
    isSecondaryActionDisabled: undefined,
    isDismissable: false,
    isKeyboardDismissDisabled: false,
}


export const $dialogStore = map<DialogStoreProps>(DEFAULT_STATE)

const change = (state: boolean) => {
    state ? open() : close();
}

const open = (props?: Omit<DialogStoreProps, 'isOpen'>) => {
    //const currentDialog = $dialogStore.get();

    $dialogStore.set({
        ...DEFAULT_STATE,
        ...props,
        id: props?.id || uuid(),
        isOpen: true,
        //isFromDialog: currentDialog.isOpen
    });
}

const close = () => {
    //const currentDialog = $dialogStore.get();
    //if (currentDialog.isFromDialog) return

    $dialogStore.setKey('isOpen', false)
}

export const dialog = {
    open,
    close,
    change,
}