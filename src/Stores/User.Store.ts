import { map } from "nanostores";
import type { UserProps } from "../Types/User.Types.js";

export const $User = map<UserProps>({
    user: '',
    token: '',
    isPremium: false,
});


