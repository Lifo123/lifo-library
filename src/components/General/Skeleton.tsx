interface Props {
    height?: number;
    width?: number;
}

export default function Skeleton({ height, width }: Props) {
    const size = height ?? width ?? 30;
    
    return <span className="skeleton f-col" style={{ height: height ?? size, width: width ?? size }}></span>;
}
