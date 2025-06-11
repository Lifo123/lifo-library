import { deepMap } from "nanostores";

export interface InterfaceStore {
    [key: string]: InterfaceItemProp;
}

export interface InterfaceItemProp {
    isVisible?: boolean;
    isAnim?: boolean;
    [key: string]: any
}

export const $Interface = deepMap<InterfaceStore>({
    asideRight: {
        isVisible: false,
        isAnim: false
    },
    asideLeft: {
        isVisible: false,
        isAnim: false
    }
})


const set = (key: string, value: InterfaceItemProp) => {
    const current = $Interface.get()[key] || {};
    $Interface.setKey(key, {
        ...current,
        ...value,
    });
}



export const Interface = {
    setKey: (key: string, value: InterfaceItemProp) => set(key, value),
}