import React from "react";
import type { FlifoPortalProps } from "./FlifoPortal.Types";

let zIndexCounter = 1000;
export default function FlifoPortal(props: FlifoPortalProps) {
    const portalRef = React.useRef<HTMLSpanElement | null>(null);
    const [zIndex, setZIndex] = React.useState<number>(zIndexCounter);
    
    let bgClose = props.bgClose;
    
    if (props.portalType === 'Toaster') {
        bgClose = false
    }
    
    if (props.portalType === 'Dialoger' && props.bgClose === undefined) {
        bgClose = true
    }
    
    React.useEffect(() => {
        zIndexCounter++;
        setZIndex(zIndexCounter);
        
        portalRef.current?.setAttribute(`data-${props.portalType}-id`, `${props.portalID}`)
        
        const existingPortals = document.querySelectorAll(`[data-${props.portalType}-id="${props.portalID}"]`);
        if (existingPortals.length > 1) {
            throw new Error(`There is already a ${props.portalType} with the same ID: "${props.portalID}". Skipping render.`);
        }
    }, []);
    

    return (
        <span
            className={`flifo-portal h-100 w-100 o-hidden ${props.className || ''} ${props.isRelative ? `relative` : 'fixed'}`}
            style={{
                ...props.style,
                zIndex,
                pointerEvents: bgClose ? 'visible' : 'none',
                backgroundColor: props.bgColor,
            }}
            data-portal-type={props.portalType}
            ref={portalRef}
        >
            {props.children}
        </span>
    )
}