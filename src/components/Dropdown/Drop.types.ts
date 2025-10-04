import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { IconsType } from "../Icons/Icons.js";

export interface DropdownContextProps {
    dropRef: React.RefObject<HTMLDivElement> | null;
    btnRef: React.RefObject<HTMLDivElement> | null;
    isOpen: boolean;
    isAnim: boolean;
    duration: string;
    handleOpen: (state: boolean) => void;
}

export interface DropdownPropsTypes {
    children?: React.ReactNode;
    maxHeight?: string;
    minHeight?: string;
    duration?: string;
    frezzeScroll?: boolean;
}

export interface DropdownContentPropsTypes extends BaseComponentProps {
    children?: React.ReactNode;
    margin?: string;
    popover?: boolean;
    dir?: 'btl' | 'btr' | 'ttb' | 'ttr' | 'rtt' | 'rtb' | 'ltt' | 'ltb' | string;
}

export interface DropdownItemPropsTypes extends BaseComponentProps {
    children?: React.ReactNode;
    text?: string;
    shortCut?: string;
    icon?: IconsType;
    disabled?: boolean;
    onClick?: () => void | Promise<void>;
}


