import { deepMap } from "nanostores";

export interface InterfaceStore {
    [key: string]: any;
}

export interface InterfaceItemProp {
    isVisible?: boolean;
    isAnim?: boolean;
    accordionAllClose?: boolean;

    [key: string]: any
}

export const $interface = deepMap<InterfaceStore>({
    asideRight: {
        isVisible: false,
        isAnim: false
    },
    asideLeft: {
        isVisible: false,
        isAnim: false
    },
    accordionAllClose: false,
})