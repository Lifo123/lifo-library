import type { BaseComponentProps } from "../../Types/GeneralTypes";

export type FlifoPortalTypes = "Dialoger" | "Toaster"
export interface RelativeTypes {
    isRelative?: boolean;
    relative?: {
        top?: number;
        left?: number;
    };
}

export interface FlifoPortalProps extends BaseComponentProps, RelativeTypes {
    portalType: FlifoPortalTypes;
    portalID: string | number;
    state?: boolean;
    children?: React.ReactNode;
    bgColor?: string;
    bgClose?: boolean;
}