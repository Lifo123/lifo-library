import { BaseComponentProps } from "../../Types/GeneralTypes.js";


export interface SelectAllProps extends BaseComponentProps {
    children?: React.ReactNode;

    defaultValue?: string;
    value?: string;

    onChange?: (value: string) => void;
    margin?: string;
    popover?: boolean;
    
    dir?: 'btl' | 'btr' | 'ttb' | 'ttr' | 'rtt' | 'rtb' | 'ltt' | 'ltb' | string;
}