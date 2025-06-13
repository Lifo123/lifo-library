import { AnimationPropsTypes } from "../../Types/GeneralTypes.js";

interface CommonTypes {
    bgColor?: string
    animate?: AnimationPropsTypes
}

export interface DialogTypes extends CommonTypes {
    title?: string;
    message?: string;
    closeBtn?: boolean;
    isVisible?: boolean;
    isAnimate?: boolean;
    custom?: React.ReactNode
    children?: React.ReactNode;
    onClick?: () => void | Promise<void>;
}


export interface DialogPropsTypes extends CommonTypes {
    title: string
    message?: string
    closeBtn?: boolean
    custom?: React.ReactNode
    onClick?: () => void | Promise<void>;
}

export interface DialogPropsCustomTypes extends CommonTypes {

}


//Dialoger Types

export interface DialogerPropsTypes {

}