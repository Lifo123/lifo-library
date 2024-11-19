type EventCallback = (event: MouseEvent) => void;
type ResizeCallback = (event: UIEvent) => void;

class GlobalEventManager {
    private eventListeners: Map<number, EventCallback> = new Map();
    private resizeListeners: Map<number, ResizeCallback> = new Map();

    constructor() {
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.handleDocumentClick);
            window.addEventListener('resize', this.handleResize);
        }
    }

    /**
     * @param key
     * @param ref
     * @param onOutsideClick .
    */

    OutsideClick(key: number, ref: HTMLElement | null, onOutsideClick: () => void) {
        const callback: EventCallback = (event: MouseEvent) => {
            if (ref && !ref.contains(event.target as Node)) {
                onOutsideClick();
            }
        };
        this.eventListeners.set(key, callback);
    }

    removeOutsideClick(key: number) {
        this.eventListeners.delete(key);
    }


    private handleDocumentClick = (event: MouseEvent) => {
        this.eventListeners.forEach((callback) => callback(event));
    };

    /**
     * Registra un evento de redimensionamiento.
     * @param key Identificador único para el listener.
     * @param onResize Función a ejecutar cuando ocurra un evento de resize.
     */
    Resize(key: number, onResize: ResizeCallback) {
        this.resizeListeners.set(key, onResize);
    }

    removeResize(key: number) {
        this.resizeListeners.delete(key);
    }

    private handleResize = (event: UIEvent) => {
        this.resizeListeners.forEach((callback) => callback(event));
    };


    clearAllEvents() {
        this.eventListeners.clear();
        this.resizeListeners.clear();
    }

    destroy() {
        document.removeEventListener('click', this.handleDocumentClick);
        window.removeEventListener('resize', this.handleResize);
        this.clearAllEvents();
    }
}

export const EventManager = new GlobalEventManager();
