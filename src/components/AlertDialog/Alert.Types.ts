import type { AnimationTypes, BaseComponentProps, DirTypes, OffsetTypes } from "../../Types/GeneralTypes.js";
type AnimationWithoutSlide = Exclude<AnimationTypes, 'slide'>;

export interface AlertBasicProps {
    dialogerID?: string;
    animate?: AnimationWithoutSlide;
    offset?: OffsetTypes;
    bgColor?: string;
    bgClose?: boolean;
    dir?: DirTypes;
}

export interface AlertProps extends AlertBasicProps, BaseComponentProps {
    id?: number;
    state: boolean;
    title?: string;
    message?: string;
    href?: string;
    children?: React.ReactNode;
    closeResize?: boolean;
    closeBtn?: boolean;
    onClick?: () => Promise<void>;
    loadingID?: string;
}

export interface AlertFunctionProps extends BaseComponentProps {
    title?: string
    message: string;
    closeBtn?: boolean;
    bgClose?: boolean;
    animate?: AnimationWithoutSlide;
    bgColor?: string;
    href?: string;
    closeResize?: boolean;
    onClick?: () => Promise<void>;
}
export interface AlertCustomProps extends AlertBasicProps, BaseComponentProps, AlertProps { }


export interface AlertDialogerProps {
    dialogerID?: string
    isRelative?: boolean;
    bgClose?: boolean;
    bgColor?: string;
    state?: boolean
}