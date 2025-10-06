'use client'
import React from "react";
import { Dropdown, DropdownContent, DropdownTrigger } from "../Dropdown/index.js";
import { SelectAllProps } from "./Select.Types.js";
import Icons from "../Icons/Icons.js";
import Tooltip from "../Tooltip/Tooltip.js";

interface SelectContext {
    value?: string;
    selectedText?: string;
    handleChange?: (value: string, text?: string) => void | Promise<void>;
}

export const SelectContext = React.createContext<SelectContext>({
    value: '',
});


export default function Select(props: SelectAllProps) {
    const [value, setValue] = React.useState<string | undefined>(undefined);
    const [selectedText, setSelectedText] = React.useState<string>();

    const handleChange = (value: string, text?: string) => {
        setValue(value);
        setSelectedText(text ?? value);
        props.onChange?.(value);
    }

    return (
        <SelectContext.Provider value={{ value, selectedText, handleChange }}>
            <Dropdown frezzeScroll popover overlap={false} dir="btl" autoAdjust>
                <Tooltip label={value ?? 'Select'}>
                    <DropdownTrigger data-value={value}>
                        <div
                            className={`select-wrapper o-hidden text-ellipsis text-nowrap w-100 ${props.className || 'f-row justify-between gap-3 select-none fw-500 f-center py-1 ps-3 pr-2 rounded-md bg-lifo-bg-secondary border border-lifo-border fs-2'}`}
                            style={{
                                ...props.style,
                                width: props.style?.width || '100px'
                            }}
                            data-value={value}
                        >
                            {props.value || props.defaultValue || 'Select'}
                            <Icons icon="arrow" size={16} rotate={180} />
                        </div>
                    </DropdownTrigger>
                </Tooltip>

                <DropdownContent
                    className={props.className}
                    style={props.style}
                >
                    {props.children}
                </DropdownContent>
            </Dropdown>
        </SelectContext.Provider>
    )
}