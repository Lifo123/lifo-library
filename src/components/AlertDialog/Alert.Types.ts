import type { BaseComponentProps, AnimationProps } from "../../Types/GeneralTypes.js";
type AnimateType = "custom" | 'none';

export interface AlertStoreProps extends AlertBasicProps, BaseComponentProps {
    title?: string;
    message?: string;
    state?: boolean;
    href?: string;
    closeBtn?: boolean;
    onClick?: () => Promise<void> | void;
    loadingID?: string;
    children?: React.ReactNode;
}

export interface AlertBasicProps {
    animate?: AnimateType;
    startAnim?: AnimationProps;
    endAnim?: AnimationProps;
    bgColor?: string;
    bgClose?: boolean;
}

export interface AlertFunctionProps extends BaseComponentProps, AlertBasicProps {
    title?: string
    message: string;
    closeBtn?: boolean;
    href?: string;
    onClick?: () => Promise<void> | void;
}


export interface AlertCustomProps extends AlertBasicProps, BaseComponentProps { }

export interface AlertDialogerProps{
    loadingID?: string;
    bgColor?: string;
    bgClose?: boolean;
}
