"use client";
import { onMount } from "nanostores";
import { deepMap } from "@nanostores/deepmap";

export const isBrowser = typeof window !== "undefined";

type ClientStore = {
  isMotionReduced: boolean;
  isMobile: boolean;
  isTouchDevice: boolean;
  isDarkMode: boolean;
};

let initial: ClientStore = {
  isMotionReduced: false,
  isMobile: false,
  isTouchDevice: false,
  isDarkMode: false,
};

if (isBrowser) {
  initial.isMotionReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  initial.isMobile = window.matchMedia("(max-width: 768px)").matches;
  initial.isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  initial.isDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
}

export const $clientStore = deepMap<ClientStore>(initial);

if (isBrowser) {
  onMount($clientStore, () => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMotion = (e: MediaQueryListEvent) =>
      $clientStore.setKey("isMotionReduced", e.matches);
    const handleMobile = (e: MediaQueryListEvent) =>
      $clientStore.setKey("isMobile", e.matches);
    const handleTouch = (e: MediaQueryListEvent) =>
      $clientStore.setKey("isTouchDevice", e.matches);
    const handleTheme = (e: MediaQueryListEvent) =>
      $clientStore.setKey("isDarkMode", e.matches);

    motionQuery.addEventListener("change", handleMotion);
    mobileQuery.addEventListener("change", handleMobile);
    touchQuery.addEventListener("change", handleTouch);
    themeQuery.addEventListener("change", handleTheme);

    return () => {
      motionQuery.removeEventListener("change", handleMotion);
      mobileQuery.removeEventListener("change", handleMobile);
      touchQuery.removeEventListener("change", handleTouch);
      themeQuery.removeEventListener("change", handleTheme);
    };
  });
}
