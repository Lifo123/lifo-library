interface PlusProps {
    type?: string;
    style?: React.CSSProperties;
    funct?: (value: any) => void;
}

const typeMap: Record<string, string> = {
    circle: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0m-5.5 0H12m0 0H8.5m3.5 0V8.5m0 3.5v3.5',
    square: 'M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6zM15.5 12H12m0 0H8.5m3.5 0V8.5m0 3.5v3.5',
    file: 'M10 15.5h4m-2-2v4M9.728 3H7.5a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h9a2.25 2.25 0 0 0 2.25-2.25V12M9.728 3C10.971 3 12 4.007 12 5.25V7.5a2.25 2.25 0 0 0 2.25 2.25h2.25A2.25 2.25 0 0 1 18.75 12M9.728 3c3.69 0 9.022 5.36 9.022 9',
    only: 'M18 12h-6m0 0H6m6 0V6m0 6v6'
}

export default function Social({ type = 'github', style, funct }: PlusProps) {
    return (
        <span className="icon" style={style} onClick={funct}>
            <svg width="32" height="32" fill="none" stroke="currenColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d={typeMap[type]} />
            </svg>
        </span>
    )
}