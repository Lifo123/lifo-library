'use client'
//Alert.Types.ts
export interface NormalProps {
    title: string;
    description: string;
    link?: string | undefined;
    children?: React.ReactNode;
    funct?: () => void;
    id?: string
}

export interface CustomProps {
    closeButton?: boolean;
    id?: string | undefined;
}
