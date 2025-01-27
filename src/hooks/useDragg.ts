import { useState, useEffect } from "react";

interface UseDraggableProps {
    target?: React.RefObject<HTMLElement>;
    centerX?: boolean; // Centrar en X
    centerY?: boolean; // Centrar en Y
}

export interface UseDraggableReturn {
    isDragging: boolean;
    handleMouseDown: (e: React.MouseEvent) => void;
}

export const useDraggable = ({
    target,
    centerX = false,
    centerY = false,
}: UseDraggableProps): UseDraggableReturn => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);

        const rect = target?.current?.getBoundingClientRect() || (e.target as HTMLElement).getBoundingClientRect();

        // Calculamos el offset inicial teniendo en cuenta `centerX` y `centerY`
        setOffset({
            x: e.clientX - rect.left - (centerX ? rect.width / 2 : 0),
            y: e.clientY - rect.top - (centerY ? rect.height / 2 : 0),
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const element = target?.current || (e.target as HTMLElement);
        if (element) {
            element.style.position = "absolute";
            element.style.left = `${e.clientX - offset.x}px`;
            element.style.top = `${e.clientY - offset.y}px`;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, offset]);

    return { isDragging, handleMouseDown };
};
