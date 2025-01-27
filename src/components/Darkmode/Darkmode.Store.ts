'use client'
import { atom } from "nanostores";
import type { DarkmodeAllTypes } from './Darkmode.types.js';

const isBrowser = typeof window !== "undefined";

export const $theme = atom<DarkmodeAllTypes>(isBrowser ? localStorage.getItem('F-Theme') as DarkmodeAllTypes || 'system' : 'system');


const toggle = (storage: string) => {
    const currentData = $theme.get()
    if (currentData === 'system') {
        const isDark = preferTheme()
        change(storage, isDark ? 'light' : 'dark')
        return;
    }

    change(storage, currentData === 'dark' ? 'light' : 'dark')
}

const change = (storage: string, newTheme: DarkmodeAllTypes | 'system') => {
    localStorage.setItem(storage, newTheme);
    $theme.set(newTheme)
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


const remove = (target: HTMLElement) => {
    target.classList.remove('light', 'dark')
}



export const Darkmode = {
    remove,
    toggle, 
    change, 
    preferTheme
};