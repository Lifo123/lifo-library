import { useState, useEffect } from "react";

const validElement = (e: React.MouseEvent): HTMLElement | null => {
    return (e.target as HTMLElement)?.closest("[data-resize-target]") || null;
};

export const useResize = () => {
    const [isResizing, setIsResizing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });

    const handleMouseDown = (e: React.MouseEvent, type: "row" | "col" | "both") => {
        const target = validElement(e);
        if (!target) return;

        const rect = target.getBoundingClientRect();

        // Almacenamos las posiciones iniciales
        setStartPos({ x: e.clientX, y: e.clientY });
        setInitialSize({ width: rect.width, height: rect.height });
        setIsResizing(true);

        // Guardamos el tipo de redimensionamiento en el dataset del target
        target.dataset.resizeType = type;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;

        const target = document.querySelector("[data-resize-target][data-resize-type]") as HTMLElement;
        if (!target) return;

        const resizeType = target.dataset.resizeType as "row" | "col" | "both";

        const deltaX = e.clientX - startPos.x; // Cambio en X
        const deltaY = e.clientY - startPos.y; // Cambio en Y

        // Calculamos nuevos tamaños dependiendo del tipo
        if (resizeType === "col" || resizeType === "both") {
            const newWidth = Math.max(initialSize.width + deltaX, 50); // Aseguramos tamaño mínimo
            target.style.width = `${newWidth}px`;
        }

        if (resizeType === "row" || resizeType === "both") {
            const newHeight = Math.max(initialSize.height + deltaY, 50); // Aseguramos tamaño mínimo
            target.style.height = `${newHeight}px`;
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);

        // Limpiamos el tipo de redimensionamiento
        const target = document.querySelector("[data-resize-target][data-resize-type]") as HTMLElement;
        if (target) {
            delete target.dataset.resizeType;
        }
    };

    useEffect(() => {
        if (isResizing) {
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
    }, [isResizing]);

    return {
        handleMouseDown,
    };
};
