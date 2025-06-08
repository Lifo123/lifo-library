export interface UserProps {
    user: string;
    token: string;
    phone?: string;
    email?: string;
    avatarUrl?: string;

    isLogin?: boolean;
    isPremium?: boolean;
    suscriptionExpires?: Date;
}
