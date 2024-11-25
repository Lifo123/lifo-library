import type { BaseComponentProps, AnimationProps } from "../../Types/GeneralTypes.js";
type AnimateType = "custom" | 'none';

export interface AlertStoreProps {
    [key: string]: Storeitem
}

export interface Storeitem extends AlertBasicProps, BaseComponentProps {
    title?: string;
    message?: string;
    state?: boolean;
    isVisible?: boolean;
    href?: string;
    closeBtn?: boolean;
    onClick?: () => Promise<void> | void;
    endFunc?: () => Promise<void> | void;
    loadingID?: string;
    children?: React.ReactNode;
}

export interface AlertBasicProps {
    id: string;
    animate?: AnimateType;
    startAnim?: AnimationProps;
    endAnim?: AnimationProps;
    bgColor?: string;
    bgClose?: boolean;
}

export interface AlertFunctionProps extends BaseComponentProps, AlertBasicProps {
    title?: string
    message?: string;
    closeBtn?: boolean;
    href?: string;
    onClick?: () => Promise<void> | void;
    endFunc?: () => Promise<void> | void;
}


export interface AlertCustomProps extends AlertBasicProps, BaseComponentProps {
    id: string
    endFunc?: () => Promise<void> | void;
}

export interface AlertDialogerProps {
    loadingID?: string;
    bgColor?: string;
    bgClose?: boolean;
}
