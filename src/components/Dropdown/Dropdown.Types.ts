export type DropOffset = "bottom" | "top" | "left" | "right"
export type DropDirectionAppear = "toBottom" | "toLeft" | "toTop" | "toRight"
export type DropAnimation = "slide" | "fade" | "custom"


interface ListProps {
    id?: number;
    value?: string | number;
    text: string;
    position?: number;
    className?: string;
    style?: React.CSSProperties
    onClick?: () => void;
}


export interface BaseDropdownProps {
    title?: string;
    iconTitle?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties
    offset?: DropOffset
    top?: string;
    left?: string;
    transform?: string;
    direction?: DropDirectionAppear;
    animation?: DropAnimation;
    contents?: Array<Array<ListDropProps>>;
}

export interface ListDropProps extends ListProps {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    href?: string;
    onHover?: () => void;
}

export interface AllDropdownProps extends Array<DropdownProps> {
    title?: string
}

export interface DropdownProps extends BaseDropdownProps, DropdownButtonProps, DropdownFunction {
    id?: number;
    state: boolean;

}

export interface DropdownButtonProps extends BaseDropdownProps {
    text?: string;
}

export interface DropdownFunction extends BaseDropdownProps {
    target?: JSX.Element
}


export interface SelectProps extends ListProps {
    width?: string;
    icon?: React.ReactNode;
}
