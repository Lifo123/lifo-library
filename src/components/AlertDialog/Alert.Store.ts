'use client'
import { map } from "nanostores";
import type { AlertCustomProps, AlertFunctionProps, AlertProps } from "./Alert.Types.js";
import { Scroll } from "../../utils/Scroll.Utils.js";
import { Flifo } from "../../utils/General.Utils.js";


export const $Alert = map<Array<AlertProps>>([])

const set = (props: AlertProps) => {
    const updatedAlert = $Alert.get();
    const id = Flifo.IDnumber();
    
    if (updatedAlert.length > 0) {
        console.warn(`An alert is already active. Please dismiss the existing dialog before opening a new one.`);
        return;
    }
    $Alert.set([...updatedAlert, { ...props, id, state: true }])
    Scroll.hide()

    return id
}

const show = (props: AlertFunctionProps) => {
    const id = set({ ...props, state: true })
    return id
}

const dismiss = (id?: number) => {
    const updatedAlert = $Alert.get();
    if (id) {
        const updatedAlerts = updatedAlert.map(item =>
            item.id === id ? { ...item, state: false } : item
        );
        $Alert.set([...updatedAlerts]);
        return;
    }
    const updatedAlerts = updatedAlert.map(item => ({ ...item, state: false }));
    $Alert.set([...updatedAlerts]);
};

const remove = (id?: number) => {
    Scroll.show();
    if (id) {
        const updatedAlerts = $Alert.get();
        const filteredAlerts = updatedAlerts.filter(item => item.id !== id);
        $Alert.set(filteredAlerts);
        return;
    }
    $Alert.set([]);
};

const removeDelay = (id?: number, delay?: number) => {
    setTimeout(() => {
        remove(id);
    }, delay || 0);
};

const custom = (children: React.ReactNode, props?: AlertCustomProps) => {
    const id = set({ children, ...props })
    return id
}

export const Alert = {
    show, remove, dismiss, removeDelay, custom
};