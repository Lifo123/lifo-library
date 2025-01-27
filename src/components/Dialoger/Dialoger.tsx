'use client'
import { useStore } from "@nanostores/react";
import Dialog, { DialogDev } from "./Dialoger.Store.js";
import type { DialogerPropsTypes } from "./Dialoger.Types.js";
import { ButtonPromise, CloseBtn } from '../General/index.js';


export default function Dialoger({ ...props }: DialogerPropsTypes) {
    const Store = useStore(DialogDev.$Dialoger)
    const AllOffsets = {
        '--custom-start-top': Store.animate?.start?.top || '-1.5rem',
        '--custom-end-top': Store.animate?.end?.top || '-2rem',

        '--custom-start-left': Store.animate?.start?.left,
        '--custom-end-left': Store.animate?.end?.left,

        '--custom-start-opacity': Store.animate?.start?.opacity || 0,
        '--custom-end-opacity': Store.animate?.end?.opacity || 1,

        '--custom-start-transform': Store.animate?.start?.transform || 'scale(0.9)',
        '--custom-end-transform': Store.animate?.end?.transform || 'scale(1)',

        '--custom-duration': `${Store.animate?.duration || 0.25}s`,

    };

    return (
        Store.isVisible && (
            <span className="lifo-portal d-flex f-center fixed dialog h-100"
                style={{
                    backgroundColor: Store.bgColor || '#0000003b',
                    pointerEvents: 'visible'
                }}
                onClick={() => {
                    Dialog.hide()
                }}
                data-anim={Store.isAnimate ? "true" : "false"}
            >
                <span className="dialoger-container f-col relative" style={{
                    overflow: 'visible',
                    ...AllOffsets
                }}
                    data-anim={Store.isAnimate ? "true" : "false"}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {Store.children || (
                        <div className="dialoger-child f-col g-1 f-justify-center p-4 br-10 w-95 mx-auto">
                            <div className='f-row f-justify-between f-align-start g-3'>
                                <div className="f-col g-1 text-left">
                                    {Store.title && <h4 className="fs-4 m-0 fw-600 mb-2">{Store.title}</h4>}
                                    {Store.desc && <p className="fs-3 m-0 fw-500 mb-2">{Store.desc}</p>}
                                </div>
                                {Store.closeBtn && (
                                    <span className='pb-5'>
                                        <CloseBtn size={25} onClick={() => {
                                            Dialog.hide()
                                        }} />
                                    </span>
                                )}
                            </div>
                            <div className="f-row g-2 f-wrap f-justify-between mt-1">
                                <span className="btn btn-third br-6 fs-2 pointer" onPointerDown={() => {
                                    Dialog.hide()
                                }}>
                                    Cancel
                                </span>
                                <ButtonPromise className="btn-primary btn br-6" text="Continue" onClick={async () => {
                                    if (Store.onClick) {
                                        await Store.onClick?.()
                                    } else {
                                        console.warn('No onClick function defined');

                                    }
                                    Dialog.hide()
                                }} />
                            </div>
                        </div>
                    )}
                </span>
            </span>
        )
    )
}
