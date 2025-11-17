'use client'

type Props = React.HTMLAttributes<HTMLSpanElement>

export default function Skeleton(props: Props) {
    return <span className={`skeleton ${props.className}`} style={{
        height: props?.style?.height || '18px',
        ...props.style
    }} {...props}>
    </span>;
}
