import { deepMap } from 'nanostores'
import { ThemeTypes } from '../Types/GeneralTypes.js'
import { ManageLocal } from '../utils/Local.Utils.js';


interface PreferencesProps {
    theme?: ThemeTypes,
    [key: string]: any
}

export const $preferences = deepMap<PreferencesProps>()


if (typeof window !== "undefined") {
    const saved = ManageLocal.prefs.get()

    if (saved) $preferences.set(saved);
    $preferences.subscribe((value) => {
        ManageLocal.prefs.set(value)
    })
}
