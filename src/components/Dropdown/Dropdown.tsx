// Dropdown.tsx
'use client';
import React from "react";
import { DropdownProvider } from "./DropdownProvider.js";

interface DropdownProps {
    children?: React.ReactNode;
    els?: string[];

    frezzeScroll?: boolean;
    overlap?: boolean;
    popover?: boolean;

    offset?: string;
    margin?: string;
    duration?: string;

    minSpaceY?: number;
    minSpaceX?: number;

    autoAdjust?: boolean;
    dir?: 'btl' | 'btr' | 'ttl' | 'ttr' | 'rtt' | 'rtb' | 'ltt' | 'ltb';
}

export default function Dropdown(props: DropdownProps) {
    
    return (
        <DropdownProvider dir={props.dir || 'btr'} {...props}>
            <div className="drop-all relative select">
                {props.children}
            </div>
        </DropdownProvider>
    );
}
