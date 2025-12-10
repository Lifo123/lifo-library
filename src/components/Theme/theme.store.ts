'use client'
import { isBrowser } from "@Stores/config";
import { atom } from "nanostores";

export type ThemeTypes = 'light' | 'dark' | 'system';

const initialTheme = isBrowser ? localStorage.getItem('theme') as ThemeTypes : 'system';
export const $darkmode = atom<ThemeTypes>(initialTheme);

const toggle = () => {
  const currentTheme = $darkmode.get();

  if (currentTheme === 'system') {
    const isDark = preferTheme()
    change(isDark ? 'light' : 'dark')
    return;
  }

  change(currentTheme === 'dark' ? 'light' : 'dark')
}

const change = (newTheme: ThemeTypes) => {
  $darkmode.set(newTheme);

  let isDark = preferTheme();

  if (newTheme === 'system') {
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    document.documentElement.classList[isDark ? 'remove' : 'add']('light');
    localStorage.setItem('theme', newTheme);
    return;
  }

  isDark = newTheme === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  document.documentElement.classList[isDark ? 'remove' : 'add']('light');

  localStorage.setItem('theme', newTheme);
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

export const darkmode = {
  remove,
  toggle,
  change,
  preferTheme,
  setTheme,
  setDark: (target: HTMLElement) => setTheme('dark', target),
  setLight: (target: HTMLElement) => setTheme('light', target),
};
