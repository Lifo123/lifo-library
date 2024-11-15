import { atom } from "nanostores";
import { type DarkmodeDropType } from '../Darkmode/Darkmode.types.js';
import { Local } from "@Utils/Local.js";

const isBrowser = typeof window !== "undefined";

export const $darkmode = atom<DarkmodeDropType>(isBrowser ? Local.get('F-Theme') || 'system' : 'system');

const system = (storage: string) => {
    change(storage, 'system')
}

const dark = (storage: string) => {
    change(storage, 'dark')
}

const light = (storage: string) => {
    change(storage, 'light')
}

const toggle = (storage: string) => {
    const currentData = $darkmode.get()
    change(storage, currentData === 'dark' ? 'light' : 'dark')
}

const change = (storage: string, newTheme: DarkmodeDropType) => {
    Local.set(storage, newTheme);
    if (newTheme === 'system') {
        const isDark = preferTheme();
        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
        return;
    }
    const isDark = newTheme === 'dark';
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

const preferTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const Darkmode = {
    system, dark, light, toggle, change
};