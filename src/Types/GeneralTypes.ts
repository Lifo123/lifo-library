export type AnimationTypes = 'slide' | 'fade' | "scale" | 'none' | 'custom';
export type DirTypes = 'rtl' | 'ltr' | 'ttb' | 'btt'
export type OffsetTypes = 'top' | 'bottom' | 'left' | 'right'
export type ThemeTypes = 'light' | 'dark';



export interface AnimationProps {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    opacity?: string;
    transform?: string;
}

export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
}