'use client'
import { useStore } from "@nanostores/react";
import { Dialog, $Dialoger } from "./Dialoger.Store.js";
import type { DialogerPropsTypes } from "./Dialoger.Types.js";
import { ButtonPromise, CloseBtn } from '../General/index.js';


export default function Dialoger({ ...props }: DialogerPropsTypes) {
    const Store = useStore($Dialoger)

    const AllOffsets = {
        '--custom-start-top': Store.animate?.start?.top || '1.5rem',
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
            <span className={`flifo-portal d-flex f-center fixed dialog ${Store.isAnimate ? "visible" : "delete"}`}
                style={{
                    backgroundColor: Store.bgColor || '#0000003b',
                    pointerEvents: 'visible',
                    ...AllOffsets
                }}
                onClick={() => {
                    Dialog.hide()
                }}
                data-anim={Store.isAnimate ? "true" : "false"}
            >
                <span className="dialoger-container f-col relative" style={{
                    overflow: 'visible',
                }}
                    data-anim={Store.isAnimate ? "true" : "false"}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {Store.children || (
                        <div className="dialoger-content f-col g-1 f-justify-center p-4 br-10 mx-auto">
                            <div className='f-col g-1 f-justify-between f-align-start'>
                                <div className="f-row f-justify-between f-align-center w-100">
                                    {Store.title && <h4 className="fs-4 m-0 fw-600">{Store.title}</h4>}
                                    {Store.closeBtn && (
                                        <span >
                                            <CloseBtn size={25} onClick={() => {
                                                Dialog.hide()
                                            }} />
                                        </span>
                                    )}
                                </div>
                                {
                                    Store.custom || Store.message && <p className="fs-2 m-0 fw-400 mb-2" style={{color: 'var(--vscode-description-foreground)'}}>{Store.message} </p>
                                }

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
