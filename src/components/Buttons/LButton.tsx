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

    return (
        mode === 'href' ? (
            <a className={`lb-btn-${type} lb-btn pointer w-max ${className || ''}`} href={href || '#'} style={{ ...style, backgroundColor: color || undefined }} onClick={handleClick}>
                {text}
            </a>
        ) : (
            <span className={`lb-btn-${type} lb-btn pointer w-max ${className || ''}`} style={{ ...style, backgroundColor: color || undefined }} onClick={handleClick}>
                {text}
            </span>
        )
    )
}