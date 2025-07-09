'use client'
import { $preferences } from "../../Stores/Preferences.Store.js";
import { ThemeTypes } from "../../Types/GeneralTypes.js";



const toggle = () => {
    const currentData = $preferences.get().theme;
    if (currentData === 'system') {
        const isDark = preferTheme()
        change(isDark ? 'light' : 'dark')
        return;
    }

    change(currentData === 'dark' ? 'light' : 'dark')
}

const change = (newTheme: ThemeTypes) => {
    $preferences.setKey('theme', newTheme);

    let isDark = preferTheme();

    if (newTheme === 'system') {
        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
        document.documentElement.classList[isDark ? 'remove' : 'add']('light');
        $preferences.setKey('isDark', isDark);
        return;
    }

    isDark = newTheme === 'dark';
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    document.documentElement.classList[isDark ? 'remove' : 'add']('light');

    $preferences.setKey('isDark', isDark);
}

const preferTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const setTheme = (theme: 'light' | 'dark', target: HTMLElement) => {
    remove(target);
    target.classList.add(theme);
}

const remove = (target: HTMLElement) => {
    target.classList.remove('light', 'dark')
}



export const Darkmode = {
    remove,
    toggle,
    change,
    preferTheme,
    setTheme,
    setDark: (target: HTMLElement) => setTheme('dark', target),
    setLight: (target: HTMLElement) => setTheme('light', target),
};