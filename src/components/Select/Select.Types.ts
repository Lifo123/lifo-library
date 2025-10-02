import { BaseComponentProps } from "../../Types/GeneralTypes.js";


export interface SelectAllProps extends BaseComponentProps {
    children?: React.ReactNode;
    
    defaultValue?: string;
    value?: string;

    onChange?: (value: string) => void;
    offset?: string;
    margin?: string;
}