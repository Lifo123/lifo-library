import { map } from "nanostores";
import type { DialogPropsCustomTypes, DialogPropsTypes, ALLDialogTypes } from "./Dialoger.Types.js";
import { Scroll } from "../../utils/Scroll.Utils.js";

export const $Dialoger = map<Record<string, ALLDialogTypes>>()
export const $currentDialog = map<ALLDialogTypes>({
    bgColor: '#0000003b',
})


const create = (props: ALLDialogTypes) => {
    const id = props.id || props.title || 'dialog';
    const all = $Dialoger.get();
    if (all[id]) return;

    const newDialog = {
        ...props,
        id,
        isAnimate: false,
        isVisible: true,
        idNumber: `${id}-${Date.now()}-${Math.random()}`
    };

    const isFirstDialog = Object.keys(all).length === 0;
    if (isFirstDialog) Scroll.hide();

    $Dialoger.set({ ...all, [id]: newDialog });
    $currentDialog.set(newDialog);

    setTimeout(() => {
        const updated = $Dialoger.get();
        if (updated[id]) {
            updated[id].isAnimate = true;
            $Dialoger.set({ ...updated });
        }
    }, 10);

    return id;
};


const show = (props: DialogPropsTypes) => {
    create(props);
}

const hide = async (id?: string) => {
    const all = { ...$Dialoger.get() };

    if (id) {
        const dialog = all[id];
        if (!dialog) return;

        dialog.isAnimate = false;
        $Dialoger.set({ ...all });

        await new Promise(res => setTimeout(res, (dialog.animate?.duration ?? 0.25) * 1000));

        delete all[id];
        $Dialoger.set(all);

        const remainingVisible = Object.values(all).some(d => d.isVisible);
        if (!remainingVisible) {
            Scroll.show();
        }

    } else {
        const updated = { ...all };

        Object.entries(updated).forEach(([key, dialog]) => {
            dialog.isAnimate = false;
        });

        $Dialoger.set(updated);

        const maxDuration = Math.max(
            ...Object.values(updated).map(d => d.animate?.duration ?? 0.25)
        );

        await new Promise(res => setTimeout(res, maxDuration * 1000));

        $Dialoger.set({});
        Scroll.reset();
    }
};


export const Dialog = {
    show,
    custom: (children: React.ReactNode, props: DialogPropsCustomTypes) =>
        create({ ...props, children }),
    hide,
};