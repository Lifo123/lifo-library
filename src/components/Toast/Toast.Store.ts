'use client'
import { atom, deepMap } from "nanostores";
import type { CustomFunctionProps, ShowProps, ToastCustomProps, ToastFunctionProps, ToastItemProps, ToastPromiseProps, ToastProps } from "./Toast.Types.js";
import { Flifo } from '../../utils/General.Utils.js'

export const $firstToast = atom<ToastItemProps>({ id: 'wasa' })
export const $toast = deepMap<ToastProps>()

const set = ({ ...props }: ToastItemProps) => {
    const toastID = props.toastID || 'init';
    const updatedToasts = $toast.get()[toastID] || [];
    const id = props.id || Flifo.IDnumber().toString();

    const newToast = { ...props, toastID, state: true, id };
    $toast.setKey(toastID, [...updatedToasts, newToast]);
    $firstToast.set(updatedToasts[0] || newToast)
    return id
}

const render = (message: string, props?: ToastFunctionProps) => {
    return set({ ...props, message })
}

const custom = (children: React.ReactNode, props?: ToastCustomProps) => {
    return set({ ...props, children });
}

const promise = async <T>(
    funct: () => Promise<T>,
    props?: ToastPromiseProps<T>
): Promise<void> => {
    const toastID = props?.toastID || 'init';
    const id = Flifo.IDnumber().toString();
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
        } else {
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


const dismiss = (arg1?: string, arg2?: string) => {
    const data = $toast.get();

    // Caso: dismiss(idText)
    // Si solo hay un argumento, lo tratamos como ID del toast (en cualquier grupo)
    if (arg1 && !arg2) {
        let matched = false;

        for (const toastID in data) {
            const updated = data[toastID].map(toast =>
                toast.id === arg1 ? { ...toast, state: false } : toast
            );

            const isMatch = data[toastID].some(toast => toast.id === arg1);

            if (isMatch) {
                $toast.setKey(toastID, updated);
                LocalToast.removeDelay(toastID, arg1, 350);
                matched = true;
            }
        }

        if (matched) return;
    }

    // Caso: dismiss('toastID', id)
    if (arg1 && arg2 !== undefined) {
        const updatedToasts = data[arg1]?.map(toast =>
            toast.id === arg2 ? { ...toast, state: false } : toast
        ) || [];
        $toast.setKey(arg1, updatedToasts);
        LocalToast.removeDelay(arg1, arg2, 300);
        return;
    }

    // Caso: dismiss('toastID') → cerrar todos los toasts de un grupo
    if (arg1) {
        const updatedToasts = data[arg1]?.map(toast => ({ ...toast, state: false })) || [];
        $toast.setKey(arg1, updatedToasts);
        updatedToasts.forEach(toast => LocalToast.removeDelay(arg1, toast.id || 'wasa', 350));
        return;
    }

    // Caso: dismiss() → cerrar todos los toasts de todos los grupos
    const updatedToasts = Object.keys(data).reduce((acc, key) => {
        acc[key] = data[key].map(toast => ({
            ...toast,
            state: false,
        }));
        return acc;
    }, {} as ToastProps);

    $toast.set(updatedToasts);

    Object.keys(data).forEach(toastID => {
        data[toastID].forEach(toast => {
            LocalToast.removeDelay(toastID, toast.id || 'wasa', 350);
        });
    });
};


const dismissFirst = (toastID?: string) => {
    const first = $firstToast.get();
    if (first.id) {
        dismiss(toastID || 'init', first.id);
    }
};

const remove = (toastID: string, id: string) => {
    const data = $toast.get()[toastID]
    if (data) {
        const updatedToasts = data.filter(toast => toast.id !== id);
        $toast.setKey(toastID, updatedToasts);
        $firstToast.set(updatedToasts[0] || { id: 0 })
    }
};

const removeDelay = (toastID: string, id: string, delay?: number) => {
    const toast = $toast.get()[toastID]?.find(toast => toast.id === id);
    setTimeout(() => {
        remove(toastID, id);
    }, toast?.animation === 'none' ? 0 : delay || 0);
};

const updateToast = (toastID: string, id: string, changes: Partial<ToastItemProps>): void => {
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