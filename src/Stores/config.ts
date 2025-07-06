import { Local } from "../utils";

export const isBrowser = typeof window !== "undefined";
export const isMobile = isBrowser ? window.innerWidth < 768 : false;

export const projectName = isBrowser ? (window.location.pathname === '/' ? 'lifo/lib' : window.location.pathname.split('/').filter(Boolean)[0]) : 'lifo/libs';


export const LocalPrefs = Local(`${projectName}-preferences`);
export const LocalUser = Local(`${projectName}-user`);