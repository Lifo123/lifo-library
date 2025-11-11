'use client'
import { MenuItem, SubmenuTrigger, type SubmenuTriggerProps } from "react-aria-components";
import { Icon, IconTypeProps } from "public-icons";

interface SubMenuProps extends Omit<SubmenuTriggerProps, 'children'> {
    children: React.ReactElement;
    label?: string;
    className?: string;
    style?: React.CSSProperties;
    icon?: IconTypeProps | React.ReactNode;
}

export default function SubMenuTrigger<T extends object>({ children, ...props }: SubMenuProps) {
    return (
        <SubmenuTrigger {...props} delay={props.delay || 100}>
            <MenuItem>
                {props.label || 'No Label'}
                <Icon icon="arrow" rotate={90} size={18} color='var(--color-lifo-text-low)' />
            </MenuItem>
            {children}
        </SubmenuTrigger>
    )
}