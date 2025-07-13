import { AnimationPropsTypes, AnimationTypes } from "../../Types/GeneralTypes.js";

interface CommonTypes {
    id?: string;
    bgColor?: string
    animate?: AnimationPropsTypes
    animation?: AnimationTypes
}

export interface ALLDialogTypes extends CommonTypes {
    id?: string;
    idNumber?: string;
    title?: string;
    description?: string;
    closeBtn?: boolean;
    isVisible?: boolean;
    isAnimate?: boolean;
    custom?: React.ReactNode
    children?: React.ReactNode;
    onClick?: () => void | Promise<void>;
}

export type DialogStoreProps = DialogPropsTypes[];

export interface DialogPropsTypes extends CommonTypes {
    title?: string
    description?: string
    closeBtn?: boolean
    custom?: React.ReactNode
    onClick?: () => void | Promise<void>;
}

export interface DialogPropsCustomTypes extends CommonTypes {

}