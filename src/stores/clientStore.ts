"use client";
import { onMount } from "nanostores";
import { deepMap } from "@nanostores/deepmap";

export const isBrowser = typeof window !== "undefined";

const TAILWIND_BREAKPOINTS = {
  isUpperXs: "(min-width: 360px)",
  isUpperSm: "(min-width: 640px)",
  isUpperMd: "(min-width: 768px)",
  isUpperLg: "(min-width: 1024px)",
  isUpperXl: "(min-width: 1280px)",
  isUpper2xl: "(min-width: 1536px)",
  // Restamos 1px a los max-width para evitar que choquen con los min-width
  isBelowXs: "(max-width: 359px)",
  isBelowSm: "(max-width: 639px)",
  isBelowMd: "(max-width: 767px)",
  isBelowLg: "(max-width: 1023px)",
  isBelowXl: "(max-width: 1279px)",
  isBelow2xl: "(max-width: 1535px)",
} as const;

export type ClientStore = {
  isMotionReduced: boolean;
  isTouchDevice: boolean;
  isDarkMode: boolean;
} & Record<keyof typeof TAILWIND_BREAKPOINTS, boolean>;

let initial = {
  isMotionReduced: false,
  isTouchDevice: false,
  isDarkMode: false,
  ...Object.keys(TAILWIND_BREAKPOINTS).reduce(
    (acc, key) => ({
      ...acc,
      [key]: false,
    }),
    {} as Record<keyof typeof TAILWIND_BREAKPOINTS, boolean>,
  ),
} as ClientStore;

if (isBrowser) {
  initial.isMotionReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  initial.isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  initial.isDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  (
    Object.keys(TAILWIND_BREAKPOINTS) as Array<
      keyof typeof TAILWIND_BREAKPOINTS
    >
  ).forEach((key) => {
    initial[key] = window.matchMedia(TAILWIND_BREAKPOINTS[key]).matches;
  });
}

export const _clientStore = deepMap<ClientStore>(initial);

if (isBrowser) {
  onMount(_clientStore, () => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMotion = (e: MediaQueryListEvent) =>
      _clientStore.setKey("isMotionReduced", e.matches);
    const handleTouch = (e: MediaQueryListEvent) =>
      _clientStore.setKey("isTouchDevice", e.matches);
    const handleTheme = (e: MediaQueryListEvent) =>
      _clientStore.setKey("isDarkMode", e.matches);

    motionQuery.addEventListener("change", handleMotion);
    touchQuery.addEventListener("change", handleTouch);
    themeQuery.addEventListener("change", handleTheme);

    const bpCleanups = (
      Object.keys(TAILWIND_BREAKPOINTS) as Array<
        keyof typeof TAILWIND_BREAKPOINTS
      >
    ).map((key) => {
      const query = window.matchMedia(TAILWIND_BREAKPOINTS[key]);
      const handler = (e: MediaQueryListEvent) =>
        _clientStore.setKey(key, e.matches);

      query.addEventListener("change", handler);
      return () => query.removeEventListener("change", handler);
    });

    return () => {
      motionQuery.removeEventListener("change", handleMotion);
      touchQuery.removeEventListener("change", handleTouch);
      themeQuery.removeEventListener("change", handleTheme);
      bpCleanups.forEach((cleanup) => cleanup());
    };
  });
}
