'use client'
import { atom, deepMap } from "nanostores";
import type { CustomFunctionProps, ShowProps, ToastCustomProps, ToastFunctionProps, ToastItemProps, ToastPromiseProps, ToastProps } from "./Toast.Types.js";
import { Flifo } from '../../utils/General.Utils.js'

export const $firstToast = atom<ToastItemProps>({ id: 0 })
export const $currentToast = atom<ToastItemProps>({ id: 0 })
export const $toast = deepMap<ToastProps>()

const set = (props: ToastItemProps) => {
    const toastID = props.toastID || 'init';
    const updatedToasts = $toast.get()[toastID] || [];
    if (updatedToasts.some(toast => toast.id === props.id)) return;

    const newToast = { ...props, toastID, state: true, id: props.id };
    $toast.setKey(toastID, [...updatedToasts, newToast]);
    $firstToast.set(updatedToasts[0] || newToast)
    return props.id
}

const render = (message: string, props?: ToastFunctionProps) => {
    return set({ ...props, message, id: Flifo.IDnumber() })
}

const delay = async (message: string, props?: ToastFunctionProps) => {
    setTimeout(() => {
        render(message, props)
    }, props?.delay || 350);
}

const custom = (children: React.ReactNode, props?: ToastCustomProps) => {
    return set({ ...props, children, id: Flifo.IDnumber() });
}

const promise = async (funct: () => Promise<void>, props?: ToastPromiseProps): Promise<void> => {
    const toastID = props?.toastID || 'init';

    const localID = props?.loading
        ? await set({
            ...props,
            message: props.loading,
            noDissapear: true,
            state: true,
            type: 'loading',
            toastID,
            id: Flifo.IDnumber(),
        }) as number
        : undefined;

    try {
        await funct();
        if (props?.success) {
            if (localID) {
                updateToast(toastID, localID, {
                    message: props.success,
                    type: 'success',
                    noDissapear: false,
                });
            } else {
                set({
                    ...props,
                    message: props.success,
                    type: 'success',
                    toastID,
                    id: Flifo.IDnumber(),
                });
            }
        }
    } catch (error) {
        if (props?.error) {
            if (localID) {
                updateToast(toastID, localID, {
                    message: props.error,
                    type: 'error',
                    noDissapear: false,
                });
            } else {
                set({
                    ...props,
                    message: props.error,
                    type: 'error',
                    toastID,
                    id: Flifo.IDnumber(),
                });
            }
        }
        throw error;
    }
};


const dismiss = (toastID?: string, id?: number) => {
    const data = $toast.get();

    if (toastID && id) {
        const updatedToasts = data[toastID].map(toast => toast.id === id ? { ...toast, state: false } : toast);
        $toast.setKey(toastID, updatedToasts);
        LocalToast.removeDelay(toastID, id, 300);
        return;
    }

    if (toastID) {
        const updatedToasts = data[toastID].map(toast => ({ ...toast, state: false, }));
        $toast.setKey(toastID, updatedToasts);
        updatedToasts.forEach(toast => LocalToast.removeDelay(toastID, toast.id, 350));
        return;
    }


    const updatedToasts = Object.keys(data).reduce((acc, key) => {
        acc[key] = data[key].map(toast => ({
            ...toast,
            state: false,
        }));
        return acc;
    }, {} as ToastProps);
    $toast.set(updatedToasts);
    Object.keys(data).forEach(toastID => {
        data[toastID].forEach(toast => LocalToast.removeDelay(toastID, toast.id, 350));
    });
};

const remove = (toastID: string, id: number) => {
    const data = $toast.get()[toastID]
    if (data) {
        const updatedToasts = data.filter(toast => toast.id !== id);
        $toast.setKey(toastID, updatedToasts);
        $firstToast.set(updatedToasts[0] || { id: 0 })
    }
};

const removeDelay = (toastID: string, id: number, delay?: number) => {
    setTimeout(() => {
        remove(toastID, id);
    }, delay || 0);
};

const updateToast = (toastID: string, id: number, changes: Partial<ToastItemProps>): void => {
    const data = $toast.get();
    if (!data[toastID]) return;

    const updatedToasts = data[toastID].map((toast) =>
        toast.id === id ? { ...toast, ...changes } : toast
    );

    $toast.setKey(toastID, updatedToasts);
};


export const LocalToast = {
    removeDelay, updateToast
}

export const toast = {
    show: (message: string, props?: ShowProps) => render(message, props),
    success: (message: string, props?: CustomFunctionProps) => render(message, { ...props, type: 'success' }),
    error: (message: string, props?: CustomFunctionProps) => render(message, { ...props, type: 'error' }),
    warning: (message: string, props?: CustomFunctionProps) => render(message, { ...props, type: 'warning' }),
    info: (message: string, props?: CustomFunctionProps) => render(message, { ...props, type: 'info' }),
    delay,
    custom,
    dismiss,
    remove,
    promise
}

export const DevToast = {
    ...toast, ...LocalToast,
    $currentToast, $firstToast, $toast,
};