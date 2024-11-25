export interface UserProps {
    user: string;
    token: string;
    email?: string;
    isLogin?: boolean;
    isPremium: boolean;
    premiumFeatures?: UserPremiumProps;
    suscriptionExpires?: Date;
    avatarUrl?: string;
}

export interface UserPremiumProps {
    wins?: number;
    streak?: number;
    data?: any;
}