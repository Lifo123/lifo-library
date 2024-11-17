'use client'
import { atom, deepMap } from "nanostores";
import type { Toastprops, toastPropTypes, ToastState } from "./Toast.Types.js";

export const initial: Toastprops = {
    init: [],
};


export const $current_toast = atom<string>('init')
export const $toast = deepMap<Toastprops>(initial)


const set = (props: toastPropTypes) => {
    const toastID = props.toastID || 'init';
    const updatedToasts = $toast.get()[toastID] || [];

    const id = updatedToasts.length + Math.random();
    if (updatedToasts.some(toast => toast.id === id)) return;

    const newToast = { ...props, id, toastID, state: true };

    const addToast = () => {
        $toast.setKey(toastID, [...updatedToasts, newToast]);
        return { toastID, id };
    };

    if (props.delay) {
        setTimeout(addToast, props.delay);
    } else {
        return addToast();
    }
};


export const clear = () => {
    $toast.set(initial)
}

export const dimiss = (toastID?: string, id?: number) => {
    const data = $toast.get();

    if (toastID) {
        const updatedToasts = data[toastID].map(toast => ({
            ...toast,
            state: false,
        }));
        $toast.setKey(toastID, updatedToasts);
        return
    }

    if (toastID && id) {
        const updatedToasts = data[toastID].map(toast => {
            if (toast.id === id) {
                return { ...toast, state: false };
            }
            return toast;
        });
        $toast.setKey(toastID, updatedToasts);
        return;
    }

    const updatedToasts = Object.keys(data).reduce((acc, key) => {
        acc[key] = data[key].map(toast => ({
            ...toast,
            state: false,
        }));
        return acc;
    }, {} as ToastState);
    $toast.set(updatedToasts);
};

const removeKey = (toastID: string, id: number) => {
    const data = $toast.get()[toastID]
    if (data) {
        const updatedToasts = data.filter(toast => toast.id !== id);
        $toast.setKey(toastID, updatedToasts);
    }
};

const removeByDelay = (toastID: string, id: number, delay?: number) => {
    setTimeout(() => {
        removeKey(toastID, id);
    }, delay || 0);
};


export const LocalToast = {
    set, removeKey, removeByDelay
}
