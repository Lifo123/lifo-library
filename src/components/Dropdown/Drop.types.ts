import { BaseComponentProps } from "../../Types/GeneralTypes.js";

export interface DropdownPropsTypes {
    children?: React.ReactNode
    maxHeight?: string;
    minHeight?: string;
    duration?: string;
    frezzeScroll?: boolean;
}

export interface DropdownContentPropsTypes extends BaseComponentProps {
    children?: React.ReactNode;
    margin?: string;
    offset?: string;
    popover?: boolean;
    dir?: 'btl' | 'btr' | 'ttb' | 'ttr' | 'rtt' | 'rtb' | 'ltt' | 'ltb' | string;
}

export interface DropdownItemPropsTypes extends BaseComponentProps {
    children?: React.ReactNode;
    text?: string;
    icon?: string;
    disabled?: boolean;
    onClick?: () => void | Promise<void>;
}


