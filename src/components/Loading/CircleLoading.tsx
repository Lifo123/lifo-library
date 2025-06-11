'use client';
interface Props {
    style?: React.CSSProperties;
    stroke?: string;
    size?: number;
}

export default function CircleLoading({ style, stroke, size }: Props) {

    return (
        <span className="lb-loading-indicator no-select absolute">
            <span className="lb-circular-root" style={{ height: size || 50 }}>
                <svg viewBox="22 22 44 44" stroke={stroke || 'rgb(var(--lb-title))'} style={{
                    strokeWidth: style?.strokeWidth || 3,
                    ...style
                }}>
                    <circle cx="44" cy="44" r="20.2" fill="none"></circle>
                </svg>
            </span>
        </span>
    )
}