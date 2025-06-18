import { deepMap } from 'nanostores'
import { ThemeTypes } from '../Types/GeneralTypes.js'
import { Local } from '../utils/Local.Utils.js';
import { isBrowser, localPrefsKey } from './config.js';


interface PreferencesProps {
    theme?: ThemeTypes
    [key: string]: any
}

export const $preferences = deepMap<PreferencesProps>() //Store

if (isBrowser) {
    const saved = Local.get(localPrefsKey)
    if (saved) $preferences.set(saved);


    $preferences.subscribe((value) => {
        Local.set(localPrefsKey, value)
    })
}
