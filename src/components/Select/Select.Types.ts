import { BaseComponentProps } from "../../Types/GeneralTypes.js";


export interface SelectAllProps extends BaseComponentProps {
    text?: string;
    title?: string;
    custom?: React.ReactNode;
    margin?: number;
    frezzeScroll?: boolean;
}