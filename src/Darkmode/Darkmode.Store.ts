import { atom } from "nanostores";

const isBrowser = typeof window !== "undefined";

const $dark = atom<string>(isBrowser ? localStorage.getItem('F-Theme') || 'system' : 'system');


const handleChange = (store: string, newTheme: string) => {
    $dark.set(newTheme);
    localStorage.setItem(store, newTheme);

    if(newTheme === 'system') {
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


export { $dark, handleChange, preferTheme };