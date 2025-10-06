import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { IconsType } from "../Icons/Icons.js";

export interface DropdownContextProps {
    dropRef: React.RefObject<HTMLDivElement> | null;
    btnRef: React.RefObject<HTMLDivElement> | null;
    isOpen: boolean;
    duration: string;
    handleOpen: (onClick: () => void) => void;
}

export interface DropdownPropsTypes {
    children?: React.ReactNode;
    duration?: string;
    margin?: string;
    popover?: boolean;
    els?: string[];
    frezzeScroll?: boolean;
    overlap?: boolean;
    offset?: string;

    minSpaceY?: number;
    minSpaceX?: number;

    autoAdjust?: boolean;
    dir: 'btl' | 'btr' | 'ttl' | 'ttr' | 'rtt' | 'rtb' | 'ltt' | 'ltb';
}

export interface DropdownContentPropsTypes extends BaseComponentProps {
    children?: React.ReactNode;
}

export interface DropdownItemPropsTypes extends BaseComponentProps {
    children?: React.ReactNode;
    text?: string;
    shortCut?: string;
    icon?: IconsType;
    disabled?: boolean;
    onClick?: () => void | Promise<void>;
}


