import { deepMap } from "nanostores";

export interface InterfaceStore {
    [key: string]: InterfaceItemProp;
}

export interface InterfaceItemProp {
    isVisible?: boolean;
    isAnim?: boolean;
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
    }
})

export const Interface = {
    setKey: (key: string, value: InterfaceItemProp) => $interface.setKey(key, value),
    get: () => $interface.get(),
}