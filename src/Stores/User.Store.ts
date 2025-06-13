import { deepMap } from "nanostores";

const BASE_STORAGE_KEY =
    (import.meta.env.PUBLIC_BASE_STORAGE_KEY ??
        (import.meta.env.MODE === 'production'
            ? 'F-Preferences'
            : 'F-Preferences-DEV')) + '-user'


interface UserProps {
    baseStorageKey: string
    [key: string]: any
}

export const $user = deepMap<UserProps>({
    baseStorageKey: BASE_STORAGE_KEY,
});


