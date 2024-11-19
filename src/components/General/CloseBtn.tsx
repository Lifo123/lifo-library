'use client'

interface Props {
    size?: number;
    stroke?: string;
    onClick?: () => void;
}

export default function CloseBtn(props: Props) {
    return (
        <span className='close-btn br-6 d-flex f-center' style={{ width: props.size || 30 }} onClick={() => {
            props.onClick?.()
        }}>
            <svg width='85%' viewBox="0 0 24 24" fill="none" stroke={props.stroke || 'rgba(var(--lb-black), .7)'}>
                <g>
                    <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" strokeWidth="2.064" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        </span>
    )
}
