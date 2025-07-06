import { deepMap } from "nanostores";
import { UserStoreTypes } from "../Types/User.Types.js";
import { isBrowser, LocalUser } from "./config.js";

export const $user = deepMap<UserStoreTypes>();

if (isBrowser) {
    const saved = LocalUser.get();
    if (saved) {
        $user.set(saved);
    }
    
    // Persistencia automática
    $user.subscribe((value) => {
        LocalUser.set(value);
    });
}

// Función para cerrar sesión
const logOut = async ({ href, execute }: { href?: string, execute?: Promise<void> } = {}): Promise<void> => {
    if (execute) await execute;
    LocalUser.remove();
    href ? window.location.href = href : window.location.reload();
};

export const User = {
    logOut,
    get: () => $user.get()
};