'use client'
import { MenuItem, SubmenuTrigger, type SubmenuTriggerProps } from "react-aria-components";
import { Icon, IconTypeProps } from "public-icons";
import { SubMenuContent } from "./MenuContent";

interface SubMenuProps extends Omit<SubmenuTriggerProps, 'children'> {
    children: React.ReactNode;
    label?: string;
    className?: string;
    style?: React.CSSProperties;
    icon?: IconTypeProps | React.ReactNode;
}

export default function SubMenuItem<T extends object>({ children, ...props }: SubMenuProps) {
    return (
        <SubmenuTrigger {...props} delay={props.delay || 100}>
            <MenuItem>
                {props.label || 'No Label'}
                <Icon icon="arrow" rotate={90} size={20} strokeWidth={2.5} color='var(--color-gray-a10)' svgProps={{y: 4}}/>
            </MenuItem>
            <SubMenuContent>
                {children}
            </SubMenuContent>
        </SubmenuTrigger>
    )
}
