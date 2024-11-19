export type AnimationTypes = 'slide' | 'fade' | "scale" | 'none'
export type DirTypes = 'rtl' | 'ltr' | 'ttb' | 'btt'
export type OffsetTypes = 'top' | 'bottom' | 'left' | 'right'
export interface OffsetProps {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
}
export type ThemeTypes = 'light' | 'dark';

export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
}