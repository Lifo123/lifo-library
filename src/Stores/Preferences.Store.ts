import { deepMap } from '@nanostores/deepmap'
import { Local } from '../utils/index.js';
import { getPath } from '../utils/Storage/path.js';
import { isBrowser } from './config.js';


type PreferencesProps = {
    theme?: 'dark' | 'light' | 'system'
    isDark?: boolean
}

export const $preferences = deepMap<PreferencesProps>()

if (isBrowser) {
    const lsPrefs = Local('preferences')
    const saved = lsPrefs.get();

    if (saved) $preferences.set(saved);
    $preferences.subscribe((value, old, changedKey) => {
        lsPrefs.updateKey(changedKey || '', getPath(changedKey || '', value))
    })
}
