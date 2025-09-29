import { BaseComponentProps } from "../../Types/GeneralTypes.js";

export interface DropDownAllTypes extends BaseComponentProps {
    text?: string;
    title?: string;
    children?: React.ReactNode;
    items?: DropdownItems[][];
    margin?: number;
    horizontalMargin?: number;
    frezzeScroll?: boolean;
    dropdown?: BaseComponentProps;
    direction?: "up" | "down";
}


export interface DropdownItems {
    text: string;
    href?: string;
    icon?: React.ReactNode;
    onClick?: () => void | Promise<void>;
}