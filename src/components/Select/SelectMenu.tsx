'use client'
import { Button, FieldError, Label, ListBox, Popover, Select, SelectValue } from "react-aria-components"
import { SelectProps, ValidationResult } from "react-aria-components"
import { Icon } from "public-icons";
import type { BaseComponentProps } from "../../Types/GeneralTypes.js";


interface SelectMenuProps<T extends object, M extends 'single' | 'multiple'>
    extends Omit<SelectProps<T, M>, 'children'> {
    label?: string;
    offset?: number;
    errorMessage?: string | ((validation: ValidationResult) => string);
    items?: Iterable<T>;
    children: React.ReactNode | ((item: T) => React.ReactNode);

    customize?: {
        trigger?: BaseComponentProps;
    }
}
export default function SelectMenu<
    T extends object,
    M extends 'single' | 'multiple' = 'single'
>({
    label, 
    errorMessage, 
    children, 
    items, 
    customize, 
    offset, 
    ...props 
}: SelectMenuProps<T, M>) {

    return (
        <Select {...props}>
            <Label>{label}</Label>
            <Button
                {...customize?.trigger}
                className={customize?.trigger?.className || 'f-row justify-between items-center text-nowrap text-ellipsis o-hidden gap-2 border border-gray-6 pointer py-1.5 px-4 rounded-md'}
            >
                <SelectValue />
                <span aria-hidden="true" className="flex f-center">
                    <Icon icon="arrow" size={18} rotate={180} svgProps={{ viewBox: '0 1.5 24 24' }} />
                </span>
            </Button>
            <FieldError>{errorMessage}</FieldError>
            <Popover offset={offset || 5}>
                <ListBox items={items}>
                    {children}
                </ListBox>
            </Popover>
        </Select>
    )
}