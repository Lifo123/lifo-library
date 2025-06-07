import { AnimationPropsTypes, AnimationTypes, BaseComponentProps, DirTypes } from "../../Types/GeneralTypes.js";

export interface DropDownAllTypes extends BaseComponentProps {
    text?: string;
    children?: React.ReactNode;
    items?: DropdownItems[][];
    dir?: DirTypes;
    animation?: AnimationTypes;
    animate?: AnimationPropsTypes;
}


export interface DropdownItems {
    text: string;
    href?: string;
    icon?: React.ReactNode
    onClick?: () => void | Promise<void>;
}