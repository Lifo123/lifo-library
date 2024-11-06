import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";

const $dark = atom<string>(isBrowser ? localStorage.getItem('F-Theme') || 'system' : 'system');


const handleChange = (store: string, newTheme: string) => {
    $dark.set(newTheme);
    localStorage.setItem(store, newTheme);
}

const preferTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}


export { $dark, handleChange, preferTheme };