import { map } from "nanostores";

interface UserProps {
    user: string;
    token: string;
    firebaseAuth: {
        uid: string;
        isAuth: boolean;
        displayName?: string;
        photoURL?: string;
        emailVerified?: boolean;
        phoneNumber?: string;
        email?: string;
        providerData?: [
            {
                providerId: string;
                uid: string;
                displayName?: string;
                photoURL?: string;
                emailVerified?: boolean;
                phoneNumber?: string;
                email?: string;
            }
        ];
    };
}

export const $User = map<UserProps>({
    user: '',
    token: '',
    firebaseAuth: {
        uid: '',
        isAuth: false,
    }
});


