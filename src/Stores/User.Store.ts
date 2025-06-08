import { map } from "nanostores";
import type { UserProps } from "../Types/User.Types.js";

export const $user = map<UserProps>({
    user: '',
    token: '',
});


