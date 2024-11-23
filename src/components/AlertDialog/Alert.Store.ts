'use client'
import { map } from "nanostores";
import type { AlertCustomProps, AlertFunctionProps, AlertStoreProps } from "./Alert.Types.js";
import { Scroll } from "../../utils/Scroll.Utils.js";


export const $Alert = map<AlertStoreProps>({})

const set = (props: AlertStoreProps) => {
    $Alert.set({ ...props, state: true })
    Scroll.hide()
}

const show = (props: AlertFunctionProps) => {
    set({
        ...props,
        state: true
    })
}

const dismiss = () => {
    $Alert.setKey('state', false)
};

const remove = () => {
    $Alert.set({});
    Scroll.show();
};

const removeDelay = (delay?: number) => {
    setTimeout(() => {
        remove();
    }, delay || 0);
};

const custom = (children: React.ReactNode, props?: AlertCustomProps) => {
    set({
        children,
        state: true,
        ...props
    })
}

export const Alert = {
    show, remove, dismiss, removeDelay, custom
};