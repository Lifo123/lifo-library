'use client'
import { atom, deepMap } from "nanostores";
import type { CustomFunctionProps, ShowProps, ToastCustomProps, ToastFunctionProps, ToastItemProps, ToastPromiseProps, ToastProps } from "./Toast.Types.js";
import { Flifo } from '../../utils/General.Utils.js'

export const $firstToast = atom<ToastItemProps>({ id: 0 })
export const $toast = deepMap<ToastProps>()

const set = ({ ...props }: ToastItemProps) => {
    const toastID = props.toastID || 'init';
    const updatedToasts = $toast.get()[toastID] || [];

    const newToast = { ...props, toastID, state: true, id: props.id };
    $toast.setKey(toastID, [...updatedToasts, newToast]);
    $firstToast.set(updatedToasts[0] || newToast)
    return props.id
}

const render = (message: string, props?: ToastFunctionProps) => {
    return set({ ...props, message, id: Flifo.IDnumber() })
}

const custom = (children: React.ReactNode, props?: ToastCustomProps) => {
    return set({ ...props, children, id: Flifo.IDnumber() });
}

const promise = async <T>(
    funct: () => Promise<T>,
    props?: ToastPromiseProps<T>
): Promise<void> => {
    const toastID = props?.toastID || 'init';
    const id = Flifo.IDnumber();
    let localID;

    if (props?.loading) {
        localID = set({
            ...props,
            message: props.loading,
            type: 'loading',
            toastID,
            noDissapear: true,
            id: id,
        });
    }

    try {
        const data = await funct();
        if (props?.success) {
            if (localID) {
                updateToast(toastID, id, {
                    message: typeof props.success === 'string' ? props.success : props.success?.(data),
                    type: 'success',
                    noDissapear: false,
                });
            } else {
                set({
                    ...props,
                    message: typeof props.success === 'string' ? props.success : props.success?.(data),
                    type: 'success',
                    toastID,
                    id: id,
                });
            }
        }else{
            dismiss(toastID, id);
        }
    } catch (error) {
        const err =
            typeof props?.error === 'string' ? props.error : props?.error?.(error);
        if (props?.error) {
            if (localID) {
                updateToast(toastID, localID, {
                    message: err,
                    type: 'error',
                    noDissapear: false,
                });
            } else {
                set({
                    ...props,
                    message: err,
                    type: 'error',
                    toastID,
                    id: id,
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

const dismissFirst = (toastID?: string) => {
    const first = $firstToast.get();
    if (first.id) {
        dismiss(toastID || 'init', first.id);
    }
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
    show: (message: string, props?: ShowProps) => {
        return render(message, props)
    },
    success: (message: string, props?: CustomFunctionProps) => {
        return render(message, { ...props, type: 'success' })
    },
    error: (message: string, props?: CustomFunctionProps) => {
        return render(message, { ...props, type: 'error' })
    },
    warning: (message: string, props?: CustomFunctionProps) => {
        return render(message, { ...props, type: 'warning' })
    },
    info: (message: string, props?: CustomFunctionProps) => {
        return render(message, { ...props, type: 'info' })
    },
    custom,
    dismiss,
    dismissFirst,
    remove,
    promise
}

export const DevToast = {
    ...toast, ...LocalToast,
    $firstToast, $toast,
};