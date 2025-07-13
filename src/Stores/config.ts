import { Flifo } from "../utils/General.Utils.js";
import { Local } from "../utils/Local.Utils.js";

export const isBrowser = typeof window !== "undefined";
export const isMobile = isBrowser ? Flifo.isMobile() : false;

export const projectName = isBrowser ? (
    window.location.pathname === '/' ? 'lifo/lib' :
        window.location.pathname.split('/').filter(Boolean)[0]
) : 'lifo/libs';


export const LocalPrefs = Local(`${projectName}-preferences`);
export const LocalUser = Local(`${projectName}-user`);