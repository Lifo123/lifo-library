'use client'
import { Alert } from './Alert.Store.js';
export default function CloseBtn ({ size, stroke }: { size?: number, stroke?: string }) {
    return (
        <span className='lb-popup-close br-6 d-flex f-center' style={{ width: size || 30 }} onClick={Alert.close}>
            <svg width='85%' viewBox="0 0 24 24" fill="none" stroke={stroke || 'rgba(var(--lb-black), .7)'}>
                <g>
                    <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" strokeWidth="2.064" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        </span>
    )
}
