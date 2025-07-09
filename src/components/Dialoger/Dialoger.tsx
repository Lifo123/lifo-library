'use client'
import { useStore } from "@nanostores/react";
import { Dialog, $Dialoger } from "./Dialoger.Store.js";
import type { DialogerPropsTypes } from "./Dialoger.Types.js";
import { ButtonPromise } from '../General/index.js';
import Icons from "../Icons/Icons.js";


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

        '--custom-duration': `${Store.animate?.duration ?? 0.25}s`,

    };

    return (
        Store.isVisible && (
            <span className={`flifo-portal dialog ${Store.isAnimate ? "visible" : "delete"}`}
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
                        <div className="dialoger-content f-col gap-1 justify-center p-4 rounded-lg mx-auto">
                            <div className='f-col gap-1 justify-between items-start'>
                                <div className="f-row justify-between items-center w-100">
                                    {Store.title && <h4 className="fs-4 m-0 fw-600">{Store.title}</h4>}
                                    {Store.closeBtn &&
                                        <Icons icon="close" size={26} onClick={() => {
                                            Dialog.hide()
                                        }} />}
                                </div>
                                {
                                    Store.custom || Store.message && <p className="fs-2 m-0 fw-400 mb-2" style={{ color: 'var(--vscode-description-foreground)' }}>{Store.message} </p>
                                }

                            </div>
                            <div className="f-row gap-2 f-wrap justify-between mt-1">
                                <span className="btn btn-third rounded-md fs-2 pointer" onPointerDown={() => {
                                    Dialog.hide()
                                }}>
                                    Cancel
                                </span>
                                <ButtonPromise loadingId="wasa" className="btn btn-primary rounded-md fs-2 pointer h-100" text="Continue" onClick={async () => {
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
