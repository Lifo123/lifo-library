interface MenuProps {
    type?: string;
    style?: React.CSSProperties;
    funct?: (value: any) => void;
}

const typeMap: Record<string, string> = {
    burger: 'M4.5 6.5h15M4.5 12h15m-15 5.5h15',

}

export default function Menu({ type = 'burger', style, funct }: MenuProps) {
    return (
        <span className="icon" style={style} onClick={funct}>
            <svg width="32" height="32" fill="none" stroke="currenColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d={typeMap[type]} />
            </svg>
        </span>
    )
}