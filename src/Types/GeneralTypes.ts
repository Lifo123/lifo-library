export type AnimationTypes = 'slide' | 'fade' | "scale" | 'none' | 'custom';
export type DirTypes = 'rtl' | 'ltr' | 'ttb' | 'btt' | 'auto'
export type OffsetTypes = 'top' | 'bottom' | 'left' | 'right'
export type ThemeTypes = 'light' | 'dark' | 'system';

export interface AnimationPropsTypes {
    start?: AnimationProps;
    end?: AnimationProps;
    duration?: number;
}

export interface AnimationProps {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    opacity?: number;
    scale?: string;
    transform?: string;
    [key: string]: any;
}

export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
}