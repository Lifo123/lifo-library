'use client'
import { useStore } from "@nanostores/react";
import { Dialog, $Dialoger, $currentDialog } from "./Dialoger.Store.js";
import type { ALLDialogTypes } from "./Dialoger.Types.js";
import { ButtonPromise } from '../General/index.js';
import Icons from "../Icons/Icons.js";
import { Scroll } from "../../utils/Scroll.Utils.js";


export default function Dialoger() {
    const dialogs = useStore($Dialoger);
    const currentDialog = useStore($currentDialog);
    const hasVisibleDialog = Object.values(dialogs).some(dialog => dialog.isVisible);



    return (
        <span className={`flifo-portal dialoger ${hasVisibleDialog ? 'visible' : 'delete'}`} onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
                Dialog.hide();
            }
        }}
            style={{
                backgroundColor: currentDialog?.bgColor || '#0000003b',
                pointerEvents: hasVisibleDialog ? 'auto' : 'none',
            }}
        >
            {Object.entries(dialogs).map(([id, dialog]) => (
                <DailogContainer key={dialog.idNumber} {...dialog} />
            ))}
        </span>
    );
}


const DailogContainer = ({
    animation = 'slide',
    ...props
}: ALLDialogTypes) => {

    const AllOffsets = {
        '--custom-start-top': `calc(50% + ${props.animate?.start?.top || '1.5rem'})`,
        '--custom-end-top': `calc(50% + ${props.animate?.end?.top || '-3rem'})`,

        '--custom-start-left': `calc(50% + ${props.animate?.start?.left || '0rem'})`,
        '--custom-end-left': `calc(50% + ${props.animate?.end?.left || '0rem'})`,

        '--custom-start-opacity': props.animate?.start?.opacity || 0,
        '--custom-end-opacity': props.animate?.end?.opacity || 1,

        '--custom-start-scale': props.animate?.start?.scale || 'scale(0.9)',
        '--custom-end-scale': props.animate?.end?.scale || 'scale(1)',

        '--custom-duration': `${props.animate?.duration != 0 ? (props.animate?.duration || 0.2) : 0}s`,

    };
    const id = props.id ?? props.title ?? 'dialog';

    return (
        <span className="dialoger-container f-col absolute" style={{
            overflow: 'visible',
            ...AllOffsets
        }}
            data-anim={props.isAnimate ? "true" : "false"}
            data-animation={animation}
            data-id={props.idNumber}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {props.children || (
                <div className="dialoger-content f-col gap-1 justify-center p-4 rounded-lg mx-auto">
                    <div className='f-col gap-1 justify-between items-start'>
                        <div className="f-row justify-between items-center w-100">
                            {props.title && <h4 className="fs-4 m-0 fw-600">{props.title}</h4>}
                            {props.closeBtn &&
                                <Icons icon="close" size={26} onClick={() => {
                                    Dialog.hide(id)
                                }} />}
                        </div>
                        {
                            props.custom || props.description && <p className="fs-2 m-0 fw-400 mb-2">{props.description} </p>
                        }

                    </div>
                    <div className="f-row gap-2 f-wrap justify-between mt-1">
                        <button className="btn btn-third rounded-md fs-2 pointer" onClick={() => {
                            Dialog.hide(id)
                        }}>
                            Cancel
                        </button>
                        <ButtonPromise className="btn btn-primary rounded-md fs-2 pointer" text="Continue" onClick={async () => {
                            Scroll.show();
                            if (props.onClick) {
                                await props.onClick?.()
                            } else {
                                console.warn('No onClick function defined');

                            }
                            Dialog.hide(id)
                        }} />
                    </div>
                </div>
            )}
        </span>
    )
}