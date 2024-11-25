'use client'
import { map } from "nanostores";
import type { AlertCustomProps, AlertFunctionProps, AlertStoreProps, Storeitem } from "./Alert.Types.js";
import { Scroll } from "../../utils/Scroll.Utils.js";

export const $Alert = map<AlertStoreProps>({})

const set = (props: Storeitem) => {
    const newAlert = { ...props };
    $Alert.setKey(props.id, newAlert);
    Scroll.hide()
};

const show = (props: AlertFunctionProps) => {
    return set({
        ...props,
        state: true
    })
}

const dismiss = (id: string) => {
    const currentAlert = $Alert.get()[id];
    if (!currentAlert) return;

    $Alert.setKey(id, {
        ...currentAlert,
        isVisible: false,
    });

    setTimeout(() => {
        remove(id);
        if(currentAlert.endFunc) currentAlert.endFunc();
        Scroll.show();
    }, 200)

};

const remove = (id: string) => {
    const DATA = $Alert.get();
    if (!DATA) return;

    const updatedData = Object.fromEntries(
        Object.entries(DATA).filter(([key]) => key !== id)
    );
    $Alert.set(updatedData);
};

const removeDelay = (id: string, delay?: number) => {
    setTimeout(() => {
        remove(id);
    }, delay || 0);
};

const custom = (children: React.ReactNode, props: AlertCustomProps) => {
    return set({
        children,
        state: true,
        ...props,
    })
}

export const Alert = {
    show, remove, dismiss, removeDelay, custom
};