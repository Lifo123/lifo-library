'use client'
import { Menu, Popover } from "react-aria-components";
import type { MenuProps, MenuTriggerProps, PopoverProps } from "react-aria-components";

interface MenuContentProps<T>
    extends MenuProps<T>, Omit<MenuTriggerProps, "children"> {
    children?: React.ReactNode;
    popover?: PopoverProps

}

export default function MenuContent<T extends object>({ popover, children, ...props }: MenuContentProps<T>) {
    return (
        <Popover {...popover} offset={popover?.offset || 5}>
            <Menu {...props}>
                {children}
            </Menu>
        </Popover>
    )
}

export function SubMenuContent<T extends object>({ popover, children, ...props }: MenuContentProps<T>) {
    return (
        <Popover {...popover} offset={2}>
            <Menu {...props}>
                {children}
            </Menu>
        </Popover>
    )
}