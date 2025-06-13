import { deepMap } from 'nanostores'
import { ThemeTypes } from '../Types/GeneralTypes.js'

const isBrowser = typeof window !== "undefined";

const BASE_STORAGE_KEY =
    (import.meta.env.PUBLIC_BASE_STORAGE_KEY ??
        (import.meta.env.MODE === 'production'
            ? 'F-Preferences'
            : 'F-Preferences-DEV')) + '-preferences'


interface PreferencesProps {
    theme?: ThemeTypes
    baseStorageKey: string
    [key: string]: any
}

export const $preferences = deepMap<PreferencesProps>({
    baseStorageKey: BASE_STORAGE_KEY,
})

if (isBrowser) {
    const saved = localStorage.getItem(BASE_STORAGE_KEY)
    if (saved) {
        try {
            $preferences.set(JSON.parse(saved))
        } catch (err) {
            console.error('[Preferences] Invalid localStorage data', err)
        }
    }

    $preferences.subscribe((value) => {
        localStorage.setItem(BASE_STORAGE_KEY, JSON.stringify(value))
    })
}
