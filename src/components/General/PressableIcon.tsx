'use client'
import { AllIconsType, Icon, IconTypeProps } from 'public-icons'
import { Button, ButtonProps } from 'react-aria-components';

type PressableIconProps = {
    icon: AllIconsType;
} & IconTypeProps & ButtonProps

export function PressableIcon({
    icon,
    color,
    size,
    strokeWidth,
    svgProps,
    fill,
    flipHorizontal,
    flipVertical,
    rotate,
    ...triggerProps
}: PressableIconProps) {

    return (
        <Button {...triggerProps}>
            <Icon
                icon={icon}
                color={color}
                size={size}
                strokeWidth={strokeWidth}
                svgProps={svgProps}
                fill={fill}
                flipHorizontal={flipHorizontal}
                flipVertical={flipVertical}
                rotate={rotate}
            />
        </Button>
    )
}