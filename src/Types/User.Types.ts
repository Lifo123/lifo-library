interface PlatformValidTypes {
    credentials: any,
    info: any,
}


export interface UserStoreTypes {
    tiktok: PlatformValidTypes,
    google: PlatformValidTypes,
    github: PlatformValidTypes,
    discord: PlatformValidTypes,
    [key: string]: any;
}