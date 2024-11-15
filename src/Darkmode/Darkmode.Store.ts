import { atom } from "nanostores";
import { type DarkmodeDropType } from './Darkmode.types.js';

const isBrowser = typeof window !== "undefined";

export const $darkmode = atom<DarkmodeDropType>(isBrowser ? localStorage.getItem('F-Theme') as DarkmodeDropType || 'system' : 'system');
export const $isDark = atom<boolean>(isBrowser ? localStorage.getItem('F-Theme') === 'dark' || false : false);

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
    if (currentData === 'system') {
        const isDark = preferTheme()
        change(storage, isDark ? 'light' : 'dark')
        return;
    }

    change(storage, currentData === 'dark' ? 'light' : 'dark')
}

const change = (storage: string, newTheme: DarkmodeDropType) => {
    localStorage.setItem(storage, newTheme);
    $darkmode.set(newTheme)
    if (newTheme === 'system') {
        const isDark = preferTheme();
        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
        document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
        $isDark.set(isDark)
        return;
    }
    const isDark = newTheme === 'dark';
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    $isDark.set(isDark)
}

const preferTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const Darkmode = {
    system, dark, light, toggle, change
};