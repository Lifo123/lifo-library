import { deepMap } from "nanostores";
import { UserStoreTypes } from "../Types/User.Types.js";
import { Local } from "../utils/Local.Utils.js";
import { isBrowser, localUserKey } from "./config.js";

export const $user = deepMap<UserStoreTypes>();

if (isBrowser) {
    const UserStorage = Local(localUserKey);
    const saved = UserStorage.get();
    if (saved) {
        $user.set(saved);
    }
    
    // Persistencia automática
    $user.subscribe((value) => {
        UserStorage.set(value);
    });
}

// Función para cerrar sesión
const logOut = async ({ href, execute }: { href?: string, execute?: Promise<void> } = {}): Promise<void> => {
    const UserStorage = Local(localUserKey);
    if (execute) await execute;
    UserStorage.remove();
    href ? window.location.href = href : window.location.reload();
};

export const User = {
    logOut,
    get: () => $user.get()
};