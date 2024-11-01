import React from 'react';
interface LButtonProps {
    type: 'primary' | 'secondary' | 'tertiary',
    mode?: 'href' | 'button',
    href?: string,
    text: string,
    funct?: (e: any) => void,
    style?: React.CSSProperties,
    color?: string,
    className?: string
}

export default function LButton({ type, mode = 'button', href, text, funct, style, color, className }: LButtonProps) {

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (funct === undefined) return
        funct?.(e)
    }


    return React.createElement(
        mode === 'href' ? 'a' : 'span',
        {
            className: `lb-btn-${type} lb-btn pointer w-max ${className || ''}`,
            style: { ...style, backgroundColor: color || null },
            onClick: handleClick,
            href: mode === 'href' ? href : null,
        },
        text
    );
}