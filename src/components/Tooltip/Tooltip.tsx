'use client'
import React from 'react'
import { createPortal } from 'react-dom'
import { TooltipProps } from './Tooltip.Types.js'
import { Flifo } from '../../utils/General.Utils.js'


export default function Tooltip({ label, ...props }: TooltipProps) {
    const [visible, setVisible] = React.useState(false)
    const [isAnim, setIsAnim] = React.useState(false)

    const [coords, setCoords] = React.useState<any>()

    const triggerRef = React.useRef<HTMLDivElement | null>(null)
    const floatingRef = React.useRef<HTMLDivElement | null>(null)

    const offsetPx = Flifo.toPx(props.offset || '8px')

    React.useEffect(() => {
        if (visible && triggerRef.current) {
            const rect = Flifo.getRect(triggerRef.current)


            setCoords({
                x: rect.left,
                y: rect.bottom - rect.height - offsetPx,
            })
        }
        setTimeout(() => setIsAnim(visible), 10)
    }, [visible])

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className={props.className}
            >
                {props.children}
            </div>

            {createPortal(
                <div
                    className={`fixed no-select z-50 `}
                    style={{
                        transition: 'top .2s ease-in-out, opacity .2s ease-in-out',
                        top: !isAnim ? coords?.y : coords?.y - floatingRef.current!.offsetHeight - offsetPx,
                        opacity: isAnim ? 1 : 0,
                        left: coords?.x,
                    }}
                    ref={floatingRef}
                >
                    <div className="px-2 py-1 text-xs rounded-md bg-gray-800 text-white shadow">
                        {label}
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
