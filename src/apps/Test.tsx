import React from "react";
import useDropdown from "../hooks/useDropdown";
import { createPortal } from "react-dom";
import Tooltip from "../components/Tooltip/Tooltip";

export default function Test() {
    const floatingRef = React.useRef<HTMLDivElement | any>(null);
    const targetRef = React.useRef<HTMLDivElement | any>(null);

    //If isOpen createPortal
    const { values, isPopover, isAnim, isOpen, handleOpen } = useDropdown({
        elementRef: targetRef,
        floatingRef: floatingRef,
        els: ['[data-wasa]'],
        dir: 'rtb',
        offset: '8px',
        overlap: false,
        //autoAdjust: true,
        //popover: true,
        frezzeScroll: false,
    })

    return (
        <>
            <Tooltip label="Hola paquito" className="mt-40">
                <div className="btn-third btn rounded-md"
                    onClick={() => handleOpen(!isOpen)}
                    ref={targetRef}
                >
                    targetRef
                </div>
            </Tooltip>
            <div className="bg-red-500 p-4" data-wasa>
                test Click
            </div>
            {
                isOpen && createPortal(
                    <div className={`drop-content w-min top-0 left-0 p-2 fixed o-hidden bg-lifo-bg-third border border-lifo-border ${isAnim && 'active'}`}
                        style={{
                            ["--duration" as any]: `${values.duration}`,
                            top: `${values.y}px`,
                            left: `${values.x}px`,
                            width: `${values.width}px`,
                            height: '340px',
                        }}
                        data-dir={values.dir}
                        ref={floatingRef}

                    >
                        <div className="w-3xs f-col gap-2 select">
                            <span>Dir: {values.dir}   Original: {values.originalDir}</span>
                            <span>Open: {isOpen ? 'true' : 'false'}</span>
                            <span>Center: {`${values.isCenter}`}</span>
                            <span>Popover: {`${isPopover}`}</span>
                        </div>
                    </div>, document.body
                )
            }
        </>
    )
}