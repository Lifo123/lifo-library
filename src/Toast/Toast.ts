import type { functionTypes, toastPropTypes } from "./Toast.Types.js";
import { clear, dimiss, LocalToast } from "./Toast.Store.js";

const show = (message: string, props?: toastPropTypes) => {
    return LocalToast.set({ ...props, message })
}

const custom = (children: React.ReactNode, props?: toastPropTypes) => {
    const customData = { ...props, children, message: '' }
    LocalToast.set(customData)
}


export const toast = {
    show,
    success: (message: string, props?: functionTypes) => LocalToast.set({ ...props, type: 'success', message }),
    error: (message: string, props?: functionTypes) => LocalToast.set({ ...props, type: 'error', message }),
    info: (message: string, props?: functionTypes) => LocalToast.set({ ...props, type: 'info', message }),
    warning: (message: string, props?: functionTypes) => LocalToast.set({ ...props, type: 'warning', message }),
    custom,
    clear,
    dimiss,
};