import { deepMap } from 'nanostores'
import { ThemeTypes } from '../Types/GeneralTypes.js'
import { isBrowser, LocalPrefs } from './config.js';


interface PreferencesProps {
    theme?: ThemeTypes,
    [key: string]: any
}

export const $preferences = deepMap<PreferencesProps>()


if (isBrowser) {
    const saved = LocalPrefs.get()

    if (saved) $preferences.set(saved);
    $preferences.subscribe((value) => {
        LocalPrefs.set(value)
    })
}
