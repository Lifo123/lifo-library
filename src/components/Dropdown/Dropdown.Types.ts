interface AnimationTypes {
    opacity?: number;
    scale?: number;
    transform?: string;
}

export interface DropDownAllTypes extends DropdownPropsTypes {
    children?: React.ReactNode;
}

export interface DropdownPropsTypes{
    text?: string;
    className?: string;
    dir?: 'dtb' | 'dbt' | 'dlr' | 'drl'; 
    animate?: {
        start: AnimationTypes;
        end: AnimationTypes;
        duration?: number;
    }
}