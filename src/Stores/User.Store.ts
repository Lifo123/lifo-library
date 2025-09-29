import { deepMap } from "nanostores";
import { UserStoreTypes } from "../Types/User.Types.js";
import { ManageLocal } from "../utils/Local.Utils.js";

export const $user = deepMap<UserStoreTypes>();

if (typeof window !== "undefined") {
    const saved = ManageLocal.user.get();
    if (saved) {
        $user.set(saved);
    }
    
    // Persistencia automática
    $user.subscribe((value) => {
        ManageLocal.user.set(value);
    });
}

// Función para cerrar sesión
const logOut = async ({ href, execute }: { href?: string, execute?: Promise<void> } = {}): Promise<void> => {
    if (execute) await execute;
    ManageLocal.user.remove();
    href ? window.location.href = href : window.location.reload();
};

export const User = {
    logOut,
    get: () => $user.get()
};