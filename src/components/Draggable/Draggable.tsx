'use client';
import React from "react";
import { useDraggable } from "../../hooks/useDragg.js";

//Unfinished

interface DraggableProps {
    target?: React.RefObject<HTMLElement>;
    centerX?: boolean;
    centerY?: boolean;
}

export default function Draggable({ target, centerX, centerY }: DraggableProps) {
    const { isDragging, handleMouseDown } = useDraggable({ target, centerX, centerY });

    return (
        <div
            className="draggable-handle"
            style={{
                cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
        >
            <span>Move</span>
        </div>
    );
}
