'use client'
import { AllIconsType, Icon, IconTypeProps } from 'public-icons'
import { Button, ButtonProps } from 'react-aria-components';

type PressableIconProps = {
    icon: AllIconsType;
    triggerProps?: {
        className?: string;
        style?: React.CSSProperties;
    } & ButtonProps
} & IconTypeProps

export function PressableIcon({
    icon, triggerProps, ...iconProps
}: PressableIconProps) {

    return (
        <Button {...triggerProps}>
            <Icon icon={icon} {...iconProps} />
        </Button>
    )
}