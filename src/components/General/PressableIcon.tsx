'use client'
import { AllIconsType, Icon, IconTypeProps } from 'public-icons'
import { Button, ButtonProps } from 'react-aria-components';

//Importing IconTypeprops


interface PressableIconProps extends ButtonProps {
    icon: AllIconsType;
    className?: string;
    style?: React.CSSProperties;
    iconProps?: IconTypeProps
}

export function PressableIcon({
    icon, className, style, iconProps, ...props
}: PressableIconProps) {

    return (
        <Button {...props}>
            <Icon icon={icon} {...iconProps} />
        </Button>
    )
}