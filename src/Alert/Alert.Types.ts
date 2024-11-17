export interface BaseProps {
    id?: string;
    closeBtn?: boolean;
    bgClose?: boolean;
    children?: React.ReactNode;
    backgroundColor?: string;
}

export interface NormalProps extends BaseProps {
    title: string;
    message: string;
    link?: string;
    funct?: () => void;
}

export interface AlertPopupProps extends BaseProps {
    className?: string;
    style?: React.CSSProperties;
}