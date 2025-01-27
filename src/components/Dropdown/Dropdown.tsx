import React, { forwardRef, useImperativeHandle } from "react";

export interface DropDownAllTypes {
    text?: string;
    dir?: 'dtb' | 'dbt' | 'dlr' | 'drl';
    animate?: {
        start?: { scale?: string };
        end?: { scale?: string };
        duration?: number;
    };
    className?: string;
    children?: React.ReactNode;
}

const Dropdown = forwardRef(function Dropdown(
    { text, dir = 'dtb', animate, className, children }: DropDownAllTypes,
    ref: React.Ref<any>
) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAnim, setIsAnim] = React.useState(false);

    const Dir = {
        dtb: 'top left',
        dbt: 'bottom left',
        dlr: 'left center',
        drl: 'right center',
    };

    const AllOffsets = {
        '--lb-start-dropdown-scale': animate?.start?.scale || '1',
        '--lb-end-dropdown-scale': animate?.end?.scale || '1',
        '--lb-dropdown-origin': Dir[dir],
    };

    const manageDrop = (state: boolean) => {
        state ? setIsOpen(true) : setIsAnim(false);
        setTimeout(() => {
            state ? setIsAnim(true) : setIsOpen(false);
        }, state ? 10 : animate?.duration || 120);
    };

    // Exponer métodos de control mediante el ref
    useImperativeHandle(ref, () => ({
        close: () => manageDrop(false),
        open: () => manageDrop(true),
        toggle: () => manageDrop(!isOpen),
    }));

    return (
        <div className={`dropdown f-col f-center relative w-max mx-auto`}>
            <span
                className={`btn btn-third br-6`}
                onClick={() => manageDrop(!isOpen)}
            >
                {text || 'Dropdown'}
            </span>
            {isOpen && (
                <>
                    <span
                        className="lifo-portal d-flex f-center fixed dialog h-100"
                        onClick={() => manageDrop(false)}
                    ></span>
                    <div
                        className={`dropdown-content absolute d-flex ${className || 'br-6 f-col'} mx-auto`}
                        style={{
                            overflow: 'visible',
                            ...AllOffsets,
                        }}
                        data-anim={`${isAnim ? 'true' : 'false'}`}
                        data-dir={dir}
                    >
                        {children || <div>No content provided</div>}
                    </div>
                </>
            )}
        </div>
    );
});

export default Dropdown;
